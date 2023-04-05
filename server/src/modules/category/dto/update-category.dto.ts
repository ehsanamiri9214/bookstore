import { PartialType } from '@nestjs/mapped-types';
import { Category } from 'src/modules/category/entities/category.entity';

export class UpdateCategoryDto extends PartialType(Category) {}
