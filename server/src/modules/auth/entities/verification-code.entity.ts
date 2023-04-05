import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsPhone } from '../../../validator';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';

@Entity()
export class VerificationCode extends Base {
  @Column()
  @IsPhone('phone', {
    message: 'Invalid phone number.',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(5)
  code: string;
}
