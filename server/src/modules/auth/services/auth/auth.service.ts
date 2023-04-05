import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { EntityEnum, RoleEnum, TokenEnum } from 'src/enums';
import { IAppConfig } from 'src/interfaces';
import { Token } from 'src/modules/auth/entities/token.entity';
import { VerificationCode } from 'src/modules/auth/entities/verification-code.entity';
import { RoleService } from 'src/modules/auth/services/role/role.service';
import { SmsService } from 'src/modules/auth/services/sms/sms.service';
import { TokenService } from 'src/modules/auth/services/token/token.service';
import { VerificationCodeService } from 'src/modules/auth/services/verification-code/verification-code.service';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { convertNumbersToPersian, generateRandomNumbers } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly vCodeService: VerificationCodeService,
    private readonly tokenService: TokenService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
  ) {}

  async login(phone: string): Promise<{ code: string } | void> {
    let vCode = await this.vCodeService.find({ phone });
    if (!vCode) {
      vCode = plainToInstance(VerificationCode, {
        phone: phone,
        code: generateRandomNumbers(5),
      });
      await this.vCodeService.create(vCode);
    }

    const persianVCode = convertNumbersToPersian(vCode.code);
    try {
      const result = await this.smsService.send(
        phone,
        `کد تایید ورود به سامانه دیبابوک: ${persianVCode}`,
      );
      // TODO Check result and throw proper error if needed.
    } catch (error) {
      throw new ServiceUnavailableException({
        msg: 'External SMS service error.',
        error,
      });
    }

    if (this.isDev()) return { code: vCode.code };
  }

  async verify(
    phone: string,
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const vCode = await this.vCodeService.find({ phone, code });

    if (vCode) {
      await this.vCodeService.delete({ phone });
      let user: User = await this.userService.find({ phone });

      if (user) {
        await this.tokenService.delete({ user });
      } else {
        const role = await this.roleService.find({
          name: RoleEnum.USER,
        });
        user = (await this.userService.create(
          plainToInstance(User, { phone, role }),
        )) as User;
      }

      const accessToken = this.tokenService.generate(TokenEnum.ACCESS, user.id);
      const refreshToken = this.tokenService.generate(
        TokenEnum.REFRESH,
        user.id,
      );

      await this.tokenService.create(
        plainToInstance(Token, {
          accessToken,
          refreshToken,
          user,
        }),
      );

      return { accessToken, refreshToken };
    } else {
      throw new BadRequestException({
        msg: 'Invalid code.',
      });
    }
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    // Check if token is valid.
    const decoded = this.tokenService.verify(refreshToken) as { id: number };
    if (!decoded) throw new BadRequestException({ msg: 'Invalid tokenn.' });

    // Check if token already exists.
    const token = await this.tokenService.find({ refreshToken }, [
      EntityEnum.USER,
    ]);
    if (!token) throw new BadRequestException({ msg: 'Invalid token.' });

    // Generate new access token.
    const newAccessToken = this.tokenService.generate(
      TokenEnum.ACCESS,
      token.user.id,
    );

    // Update token.
    await this.tokenService.update(
      { id: token.id },
      { accessToken: newAccessToken },
    );

    return { accessToken: newAccessToken };
  }

  async logout(user: User): Promise<{ msg: string }> {
    await this.tokenService.delete({ user });
    return { msg: 'Logged out.' };
  }

  private isDev(): boolean {
    const appConfig = this.configService.get<IAppConfig>('APP');
    return appConfig.APP_ENV.toLowerCase() === 'dev';
  }
}
