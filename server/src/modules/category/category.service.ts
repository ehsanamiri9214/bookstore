import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { BookService } from 'src/modules/book/book.service';
import { Book } from 'src/modules/book/entities/book.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly bookService: BookService,
  ) {
    super(categoryRepository);
  }

  getBooks(id: number): Promise<Book[]> {
    return this.bookService.findMany({ categoryId: id }, null, 10);
  }
}
