import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Book } from 'src/modules/book/entities/book.entity';
import { CategoryService } from 'src/modules/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id/books')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number): Promise<Book[]> {
    return this.categoryService.getBooks(id);
  }
}
