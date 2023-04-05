import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { City } from './../../city/entities/city.entity';
import { State } from './../../state/entities/state.entity';
import { User } from './../../user/entities/user.entity';

@Entity()
export class Address extends Base {
  @Column()
  @IsString()
  @IsNotEmpty()
  details: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  postalCode?: number;

  @ManyToOne(() => User)
  user: User;
  @Column()
  userId: number;

  @ManyToOne(() => State)
  state: State;
  @Column()
  @IsNumber()
  stateId: number;

  @ManyToOne(() => City)
  city: City;
  @Column()
  @IsNumber()
  cityId: number;
}
