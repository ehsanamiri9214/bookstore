import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Role } from '../../auth/entities/role.entity';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Column({ nullable: true })
  @IsString()
  firstName?: string;

  @Column({ nullable: true })
  @IsString()
  lastName?: string;

  @ManyToOne(() => Role)
  role?: Role;
  @Column({ nullable: true })
  @IsNumber()
  roleId?: number;
}
