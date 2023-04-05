import { Base } from '../../../base/base.entity';
import { State } from '../../state/entities/state.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Entity()
export class City extends Base {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => State, {})
  state: State;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  stateId: number;
}
