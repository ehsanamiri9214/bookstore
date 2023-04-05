import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { VerificationCode } from 'src/modules/auth/entities/verification-code.entity';
import { AuthService } from 'src/modules/auth/services/auth/auth.service';
import { User } from 'src/modules/user/entities/user.entity';
import { PhonePipe } from 'src/pipes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  login(
    @Body('phone', PhonePipe) phone: string,
  ): Promise<{ code: string } | void> {
    return this.authService.login(phone);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verify(
    @Body() body: VerificationCode,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { phone, code } = body;
    return this.authService.verify(phone, code);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  me(@GetUser() user: User) {
    return user;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@GetUser() user: User): Promise<{ msg: string }> {
    return this.authService.logout(user);
  }
}
