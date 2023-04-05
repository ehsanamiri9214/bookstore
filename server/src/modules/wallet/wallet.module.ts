import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { WalletController } from 'src/modules/wallet/wallet.controller';
import { WalletService } from 'src/modules/wallet/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet]), AuthModule, UserModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
