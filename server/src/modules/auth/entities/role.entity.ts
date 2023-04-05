import { IsEnum } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { RoleEnum } from '../../../enums';

@Entity()
export class Role extends Base {
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  @IsEnum(RoleEnum)
  name: RoleEnum;
}
