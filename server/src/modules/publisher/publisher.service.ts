import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { BookService } from 'src/modules/book/book.service';
import { Book } from 'src/modules/book/entities/book.entity';
import { Publisher } from 'src/modules/publisher/entities/publisher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublisherService extends BaseService<Publisher> {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    private readonly bookService: BookService,
  ) {
    super(publisherRepository);
  }

  getBooks(id: number): Promise<Book[]> {
    return this.bookService.findMany({ publisherId: id }, null, 10);
  }
}
