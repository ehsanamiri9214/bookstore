import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Cart } from '../../../modules/cart/entities/cart.entity';

@Entity()
export class Invoice extends Base {
  @Column({ unique: true })
  @IsNumber()
  @IsNotEmpty()
  bankTransactionId: number;

  @OneToOne(() => Cart)
  cart: Cart;
  @Column({ unique: true })
  @IsNumber()
  @IsNotEmpty()
  cartId: number;
}
