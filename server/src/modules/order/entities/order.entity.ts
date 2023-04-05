import { IsArray, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { OrderStatus } from '../../../enums';
import { CartItem } from '../../../modules/cart/dto/cart-item.dto';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Order extends Base {
  @Column({ type: 'json' })
  @IsArray()
  items: CartItem[];

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PROCESSING,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ManyToOne(() => User)
  user: User;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
