import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/modules/auth/auth.controller';
import { Role } from 'src/modules/auth/entities/role.entity';
import { Token } from 'src/modules/auth/entities/token.entity';
import { VerificationCode } from 'src/modules/auth/entities/verification-code.entity';
import { AuthService } from 'src/modules/auth/services/auth/auth.service';
import { RoleService } from 'src/modules/auth/services/role/role.service';
import { TokenService } from 'src/modules/auth/services/token/token.service';
import { VerificationCodeService } from 'src/modules/auth/services/verification-code/verification-code.service';
import { UserModule } from 'src/modules/user/user.module';
import { SmsService } from './services/sms/sms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode, Token, Role]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    VerificationCodeService,
    TokenService,
    RoleService,
    SmsService,
  ],
  exports: [TokenService, RoleService],
})
export class AuthModule {}
