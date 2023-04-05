import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CartItem } from '../../../modules/cart/dto/cart-item.dto';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Address } from '../../address/entities/address.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Cart extends Base {
  @Column({ type: 'json' })
  @IsArray()
  items: CartItem[];

  @OneToOne(() => User)
  user: User;
  @Column({ unique: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @OneToOne(() => Address)
  address: Address;
  @Column({ unique: true, nullable: true })
  @IsNumber()
  @IsOptional()
  addressId: number;
}
