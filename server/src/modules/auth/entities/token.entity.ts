import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Token extends Base {
  @Column()
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ManyToOne(() => User)
  user: User;
  @Column()
  @IsNumber()
  userId: number;
}
