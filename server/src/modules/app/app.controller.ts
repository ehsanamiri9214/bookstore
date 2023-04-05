import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from 'src/modules/app/services/app/app.service';
import { Book } from 'src/modules/book/entities/book.entity';
import { Feed } from 'src/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  getCategories(): Promise<object[]> {
    return this.appService.getCategories();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  feed(): Promise<Feed> {
    return this.appService.feed();
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  search(@Body('searchPhrase') searchPhrase: string): Promise<Book[]> {
    return this.appService.search(searchPhrase);
  }
}
