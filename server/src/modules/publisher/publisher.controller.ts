import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Book } from 'src/modules/book/entities/book.entity';
import { PublisherService } from 'src/modules/publisher/publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Get(':id/books')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number): Promise<Book[]> {
    return this.publisherService.getBooks(id);
  }
}
