import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/base/base.service';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CartService } from './../cart/cart.service';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService extends BaseService<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly cartService: CartService,
  ) {
    super(invoiceRepository);
  }

  async createInvoice(user: User): Promise<{ bankTransactionId: number }> {
    const cart = await this.cartService.find({ userId: user.id });
    if (cart && cart.items.length > 0) {
      await this.delete({ cartId: cart.id }, false);
      const bankTransactionId = await this.getNewBankTransactionId();
      await this.create(
        plainToInstance(Invoice, {
          bankTransactionId: bankTransactionId,
          cartId: cart.id,
        }),
      );
      return { bankTransactionId };
    } else {
      throw new BadRequestException('Cart empty.');
    }
  }

  private getNewBankTransactionId(): Promise<number> {
    return Promise.resolve(123);
  }

  async verifyPayment(
    bankTransactionId: number,
    user: User,
  ): Promise<{ transactionStatus: number }> {
    let transactionStatus;
    try {
      // TODO Verify payment with bank.
      transactionStatus = 1;
    } catch (error) {
      throw new BadGatewayException({ msg: 'Bank not responding.' });
    }

    if (!transactionStatus)
      throw new BadRequestException({ msg: 'Payment failed.' });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cart = await queryRunner.manager.findOne(Cart, {
        where: { userId: user.id },
      });
      if (!cart) throw new BadRequestException({ msg: 'Cart empty.' });
      const order = plainToInstance(Order, {
        userId: user.id,
        items: cart.items,
      });
      await queryRunner.manager.save(order);
      // const transaction = plainToInstance(Transaction, {
      //   bankTransactionId,
      //   orderId: order.id,
      // });
      // await queryRunner.manager.save(transaction);
      const invoice = await queryRunner.manager.findOne(Invoice, {
        where: { cartId: cart.id },
      });
      await queryRunner.manager.delete(Cart, { id: cart.id });
      await queryRunner.manager.delete(Invoice, { id: invoice.id });
      await queryRunner.commitTransaction();
      return { transactionStatus: 1 };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      switch (error.status) {
        case 400:
          throw error;
        default:
          return { transactionStatus: 0 };
      }
    } finally {
      await queryRunner.release();
    }
  }
}
