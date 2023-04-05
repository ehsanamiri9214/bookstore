import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../base/base.entity';

@Entity()
export class Category extends Base {
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ default: true })
  @IsBoolean()
  active?: boolean;

  @ManyToOne(() => Category, {})
  parent?: Category;
  @Column({ default: null })
  @IsNumber()
  @IsNotEmpty()
  parentId?: number;
}
