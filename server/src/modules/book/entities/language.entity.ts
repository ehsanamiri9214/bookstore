import { IsEnum } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { LanguageEnum } from './../../../enums/language.enum';

@Entity()
export class Language extends Base {
  @Column({
    type: 'enum',
    enum: LanguageEnum,
    default: LanguageEnum.PERSIAN,
  })
  @IsEnum(LanguageEnum)
  name: LanguageEnum;
}
