import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthConfig } from 'src/interfaces';
import { TokenService } from 'src/modules/auth/services/token/token.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const authConfig = this.configService.get<IAuthConfig>('AUTH');
    const accessToken = request.headers[authConfig.AUTH_HEADER_PARAM];

    if (!accessToken) throw new UnauthorizedException();

    const token = await this.tokenService.find({ accessToken });
    if (token) {
      const decoded = this.tokenService.verify(accessToken) as { id: number };
      if (decoded) {
        const user = await this.userService.find({ id: decoded.id }, ['role']);
        if (user) {
          request.user = user;
          return true;
        } else {
          throw new NotFoundException({ msg: 'User not found.' });
        }
      } else {
        throw new UnauthorizedException({ msg: 'Invalid token.' });
      }
    } else {
      throw new UnauthorizedException({ msg: 'Invalid token.' });
    }
  }
}
