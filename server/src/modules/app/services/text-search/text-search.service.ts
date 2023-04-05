import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { BookService } from 'src/modules/book/book.service';
import { readExcel } from 'src/utils';

@Injectable()
export class TextSearchService {
  constructor(private readonly bookService: BookService) {}

  async load(): Promise<void> {
    // TODO Add data to the search engine. Read from DB.

    // TODO Remove this part.
    const filePath = path.join(
      __dirname,
      `../../../../../files/publishers/roshd/test.xlsx`,
    );
    try {
      const data = await readExcel(filePath);
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  }
}
