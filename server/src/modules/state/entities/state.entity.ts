import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';

@Entity()
export class State extends Base {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}
