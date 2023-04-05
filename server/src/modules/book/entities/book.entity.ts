import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';
import { Language } from '../../book/entities/language.entity';
import { Category } from '../../category/entities/category.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';

@Entity()
export class Book extends Base {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @Column({ nullable: true, default: 0 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  year?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  round?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  edit?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  pages?: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  image?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  barcode?: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  shabok?: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  pageUrl?: string;

  @Column({ default: true })
  @IsBoolean()
  active?: boolean;

  @ManyToOne(() => Category)
  category?: Category;
  @Column({ default: null })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ManyToOne(() => Language)
  language?: Language;
  @Column({ default: null })
  @IsNumber()
  @IsOptional()
  languageId?: number;

  @ManyToOne(() => Publisher)
  publisher?: Publisher;
  @Column({ default: null })
  @IsNumber()
  @IsOptional()
  publisherId?: number;

  @Column({ default: null })
  @IsString()
  @IsOptional()
  writers?: string;

  @Column({ default: null })
  @IsString()
  @IsOptional()
  authors?: string;

  @Column({ default: null })
  @IsString()
  @IsOptional()
  translators?: string;
}
