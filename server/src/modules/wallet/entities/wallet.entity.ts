import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Wallet extends Base {
  @Column()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  score: number;

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  money: number;

  @OneToOne(() => User)
  user: User;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
