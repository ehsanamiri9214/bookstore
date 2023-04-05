import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { EntityEnum } from 'src/enums';
import { BookService } from 'src/modules/book/book.service';
import { Book } from 'src/modules/book/entities/book.entity';
import { Publisher } from 'src/modules/publisher/entities/publisher.entity';
import { Feed } from 'src/types';
import { getUniqueListBy, readExcel } from 'src/utils';
import { DataSource, Like } from 'typeorm';
@Injectable()
export class AppService {
  constructor(
    private readonly bookService: BookService,
    private readonly dataSource: DataSource,
  ) {}

  async getCategories(): Promise<object[]> {
    const filePath = join(process.cwd(), 'files/categories.xlsx');
    const data = await readExcel(filePath);
    return data[0].items;
  }

  async feed(): Promise<Feed> {
    const [newest, mostViewed, highestDiscount, selected] = await Promise.all([
      this.bookService.findManyByOrder(
        'book',
        undefined,
        undefined,
        10,
        'RAND()',
      ),
      this.bookService.findManyByOrder(
        'book',
        undefined,
        undefined,
        10,
        'RAND()',
      ),
      this.bookService.findManyByOrder(
        'book',
        undefined,
        undefined,
        10,
        'RAND()',
      ),
      this.bookService.findManyByOrder(
        'book',
        undefined,
        undefined,
        10,
        'RAND()',
      ),
      // this.dataSource.getRepository(Book).find({
      //   relations: [EntityEnum.PUBLISHER],
      //   order: { id: 'DESC' },
      //   take: 10,
      // }),
    ]);

    return {
      banners: [
        {
          // img: 'img/banner/banner-1.jpeg',
          img: 'img/banner/banner-3.png',
          url: '',
        },
        {
          // img: 'img/banner/banner-2.jpeg',
          img: 'img/banner/banner-3.png',
          url: '',
        },
        {
          img: 'img/banner/banner-3.png',
          url: '',
        },
      ],
      books: {
        newest,
        mostViewed,
        highestDiscount,
        selected,
      },
    };
  }

  async search(searchPhrase: string): Promise<Book[]> {
    const searchPhraseWords = searchPhrase.split(' ');
    let results = [];

    for (const item of searchPhraseWords) {
      // Get books.
      const bookResults = await this.dataSource.getRepository(Book).find({
        where: [
          {
            name: Like(`%${item}%`),
          },
          {
            writers: Like(`%${item}%`),
          },
          {
            authors: Like(`%${item}%`),
          },
          {
            translators: Like(`%${item}%`),
          },
        ],
        relations: [EntityEnum.PUBLISHER],
        take: 100,
      });
      results = results.concat(bookResults);

      // Get publisher books.
      const publishers = await this.dataSource.getRepository(Publisher).find({
        where: [{ faName: Like(`%${item}%`) }],
        take: 100,
      });
      for (const publisher of publishers) {
        const publisherBooks = await this.dataSource.getRepository(Book).find({
          where: [{ publisherId: publisher.id }],
          relations: [EntityEnum.PUBLISHER],
          take: 100,
        });
        results = results.concat(publisherBooks);
      }
    }

    return getUniqueListBy(results, 'id') as Book[];
  }
}
