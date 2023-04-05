import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { EntityEnum } from 'src/enums';
import { Book } from 'src/modules/book/entities/book.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class BookService extends BaseService<Book> {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {
    super(bookRepository);
  }

  async findSimilarByName(name: string): Promise<Book[]> {
    const { category } = await this.find({ name }, [EntityEnum.CATEGORY]);

    const books = await this.bookRepository
      .createQueryBuilder('book')
      .select()
      .where({ categoryId: category.id, name: Not(name) })
      .orderBy('RAND()')
      .take(10)
      .getMany();

    return books;
  }

  async findSimilarById(id: string): Promise<Book[]> {
    const { category } = await this.find({ id }, [EntityEnum.CATEGORY]);
    const books = await this.findMany(
      { categoryId: category.id, id: Not(id) },
      null,
      10,
    );
    return books;
  }
}
