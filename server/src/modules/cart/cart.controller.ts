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
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { CartService } from './cart.service';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  find(@GetUser() user: User): Promise<object> {
    return this.cartService.getCart(user);
  }

  @Post('add')
  @HttpCode(HttpStatus.OK)
  addToCart(@Body('id') id: number, @GetUser() user: User): Promise<object> {
    return this.cartService.addToCart(id, user);
  }

  @Post('addAddress')
  @HttpCode(HttpStatus.OK)
  addAddressToCart(
    @Body('id') id: number,
    @GetUser() user: User,
  ): Promise<object> {
    return this.cartService.addAddressToCart(id, user);
  }

  @Post('remove')
  @HttpCode(HttpStatus.OK)
  removeFromCart(
    @Body('id') id: number,
    @GetUser() user: User,
  ): Promise<object> {
    return this.cartService.removeFromCart(id, user);
  }
}
