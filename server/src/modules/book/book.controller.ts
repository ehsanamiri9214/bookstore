import { StringPipe } from './../../pipes/string.pipe';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { EntityEnum } from 'src/enums';
import { BookService } from 'src/modules/book/book.service';
import { Book } from 'src/modules/book/entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findByName(@Query('name') name: StringPipe): Promise<Book> {
    return this.bookService.find({ name }, [
      EntityEnum.CATEGORY,
      EntityEnum.PUBLISHER,
    ]);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  find(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.find({ id }, [EntityEnum.CATEGORY]);
  }

  @Get(':name/similar')
  @HttpCode(HttpStatus.OK)
  findSimilarByName(@Param('name') name: StringPipe): Promise<Book[]> {
    return this.bookService.findSimilarByName(name.toString());
  }

  @Get('id/:id/similar')
  @HttpCode(HttpStatus.OK)
  findSimilar(@Param('id', ParseIntPipe) id: string): Promise<Book[]> {
    return this.bookService.findSimilarById(id);
  }
}
