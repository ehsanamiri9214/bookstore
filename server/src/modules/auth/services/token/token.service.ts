import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { BaseService } from 'src/base/base.service';
import { TokenEnum } from 'src/enums';
import { IAuthConfig } from 'src/interfaces';
import { Token } from 'src/modules/auth/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService extends BaseService<Token> {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly configService: ConfigService,
  ) {
    super(tokenRepository);
  }

  generate(tokenType: TokenEnum, id: number): string {
    const authConfig = this.configService.get<IAuthConfig>('AUTH');
    const jwtSecretKey = authConfig.AUTH_JWT_SECRET_KEY;
    const jwtAccessTokenExpireTime =
      authConfig.AUTH_JWT_ACCESS_TOKEN_EXPIRE_TIME;
    const jwtRefreshTokenExpireTime =
      authConfig.AUTH_JWT_REFRESH_TOKEN_EXPIRE_TIME;

    const data = { id };
    const token = jwt.sign(data, jwtSecretKey, {
      expiresIn:
        tokenType === TokenEnum.ACCESS
          ? jwtAccessTokenExpireTime
          : jwtRefreshTokenExpireTime,
    });

    return token;
  }

  verify(token: string): string | jwt.JwtPayload | boolean {
    const authConfig = this.configService.get<IAuthConfig>('AUTH');
    const jwtSecretKey = authConfig.AUTH_JWT_SECRET_KEY;
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      return decoded;
    } catch (error) {
      return false;
    }
  }
}
