import { AddressModule } from 'src/modules/address/address.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { BookModule } from 'src/modules/book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    AuthModule,
    UserModule,
    BookModule,
    forwardRef(() => AddressModule),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
