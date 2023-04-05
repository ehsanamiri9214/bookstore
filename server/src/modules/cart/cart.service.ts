import { BookService } from 'src/modules/book/book.service';
import { plainToInstance } from 'class-transformer';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CartItem } from 'src/modules/cart/dto/cart-item.dto';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/modules/book/entities/book.entity';
import { AddressService } from 'src/modules/address/address.service';

@Injectable()
export class CartService extends BaseService<Cart> {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly bookService: BookService,
    private readonly addressService: AddressService,
  ) {
    super(cartRepository);
  }

  async getCart(user: User): Promise<{ cartDetails: Book[] }> {
    const cart = await super.find({ userId: user.id });
    let cartDetails;

    if (cart) {
      cartDetails = await this.getCartDetails(cart);
    } else {
      throw new NotFoundException('No cart.');
    }

    return cartDetails;
  }

  async addToCart(id: number, user: User): Promise<object> {
    let cart = await this.find({ userId: user.id });
    if (!cart) {
      cart = (await this.create(
        plainToInstance(Cart, { items: [], userId: user.id }),
      )) as Cart;
    }

    const cartItem = cart.items.find((item) => item.id === id);
    if (cartItem) {
      cartItem.amount++;
    } else {
      cart.items.push(plainToInstance(CartItem, { id, amount: 1 }));
    }

    await cart.save();
    return await this.getCartDetails(cart);
  }

  async addAddressToCart(id: number, user: User): Promise<object> {
    const address = await this.addressService.find({ id, userId: user.id });
    if (!address) throw new NotFoundException({ msg: 'Address not found.' });

    const cart = await this.find({ userId: user.id });
    if (!cart) throw new NotFoundException({ msg: 'Cart not found.' });

    cart.addressId = address.id;
    cart.save();

    return await this.getCartDetails(cart);
  }

  async removeFromCart(id: number, user: User): Promise<object> {
    const cart = await this.find({ userId: user.id });
    if (!cart) throw new NotFoundException();

    const index = cart.items.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      if (cart.items[index].amount > 1) {
        cart.items[index].amount--;
      } else {
        cart.items.splice(index, 1);
      }
    } else {
      throw new BadRequestException();
    }

    await cart.save();
    return await this.getCartDetails(cart);
  }

  private async getCartDetails(cart: Cart): Promise<object> {
    const books = [];
    let totalPrice = 0,
      totalPriceAfterDiscount = 0;

    for (const i of cart.items) {
      const book = await this.bookService.find({ id: i.id });
      if (book) {
        books.push({ ...i, book });
        totalPrice += book.price * i.amount;
        const discount =
          book.discount && book.discount > 0 ? book.discount / 100 : 0;
        totalPriceAfterDiscount +=
          (book.price - book.price * discount) * i.amount;
      }
    }

    return { ...cart, items: books, totalPrice, totalPriceAfterDiscount };
  }
}
