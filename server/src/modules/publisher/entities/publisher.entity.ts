import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';

@Entity()
export class Publisher extends Base {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  faName: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  enName: string;
}
