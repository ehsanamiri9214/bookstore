import { Injectable } from '@nestjs/common';
import { CheerioAPI } from 'cheerio';
import { join } from 'path';
import {
  convertNumbersToEnglish,
  downloadAndSaveFile,
  sleep,
  writeExcel,
} from 'src/utils';
import { GeneralScrapeService } from './general-scrape.service';

@Injectable()
export class RoshdScrapeService {
  private readonly publisherBaseUrl = 'https://www.roshdpress.ir/';
  private readonly baseFolder = join(process.cwd(), 'files/publishers/roshd/');
  private readonly csvFilePath = `${this.baseFolder}+${new Date()}.csv`;
  private readonly excelFilePath = `${this.baseFolder}+${new Date()}.xlsx`;
  private results = [];

  constructor(private readonly generalScrapeService: GeneralScrapeService) {}

  async scrape(
    saveToFile = true,
    downloadImages = true,
  ): Promise<void | object[]> {
    let mainPage;
    try {
      mainPage = await this.generalScrapeService.getPage(this.publisherBaseUrl);
    } catch (error) {
      console.log('Fetching page failed: ', this.publisherBaseUrl);
      return;
    }

    const categories = this.getCategories(mainPage).slice(13);

    for (const category of categories) {
      console.log('Category started: ' + category.name);
      console.time('Duration');

      let pageContent;
      const categoryPageUrl = this.publisherBaseUrl + category.url;
      try {
        pageContent = await this.generalScrapeService.getPage(categoryPageUrl);
      } catch (error) {
        console.log('Fetching category page failed: ', categoryPageUrl);
        continue;
      }

      const paginatedPages = pageContent('.producs')
        .children('.pages')
        .children('.pagination')
        .children()
        .toArray();

      const books = [];
      if (paginatedPages.length === 0) {
        const newBooks = await this.getPaginatedPageBooks(category, 0);
        books.push(newBooks);
      } else {
        for (const [i, v] of paginatedPages.entries()) {
          await sleep(1000);
          const newBooks = await this.getPaginatedPageBooks(category, i);
          books.push(newBooks);
          console.log(`Paginated page ${i}: Done.`);
        }
      }

      this.results = this.results.concat(...books);
      console.timeEnd('Duration');
    }

    if (!saveToFile) {
      return this.results;
    } else {
      // writeCSV(this.csvFilePath, this.results);
      writeExcel(this.excelFilePath, [{ sheet: 'books', items: this.results }]);
    }

    if (downloadImages) {
      for (const [i, v] of this.results.entries()) {
        await downloadAndSaveFile(
          v.image,
          this.baseFolder + 'images/' + i + '.jpg',
        );
      }
    }
  }

  private getCategories(page: CheerioAPI): { name: string; url: string }[] {
    const categories = [];

    const booksParentLi = page('div.navbar-collapse ul.nav.navbar-nav')
      .children()
      .eq(2);
    const booksParentUl = booksParentLi.children().eq(1);
    const item = booksParentUl.children().eq(0);
    const itemChildUl = item.children().eq(1);
    const itemChildUlChildren = itemChildUl.children();

    itemChildUlChildren.toArray().forEach((item) => {
      categories.push({
        name: page(item).children('a').text(),
        url: page(item).children('a').attr('href'),
      });
    });

    return categories;
  }

  private async getPaginatedPageBooks(
    category: { name: string; url: string },
    i: number,
  ) {
    const books = [];
    const paginatedPageUrl =
      this.publisherBaseUrl + category.url + '/page-' + (i + 1);
    let paginatedPageContent;

    try {
      paginatedPageContent = await this.generalScrapeService.getPage(
        paginatedPageUrl,
      );
    } catch (error) {
      console.log(
        'Fetching category paginated page failed: ',
        paginatedPageUrl,
      );

      return;
    }

    const paginatedPageItems = paginatedPageContent('.producs')
      .children('div')
      .eq(0)
      .children('.product');

    for (const [i, v] of paginatedPageItems.toArray().entries()) {
      const productElementPageUrl = paginatedPageContent('.product')
        .eq(i)
        .children()
        .eq(1)
        .children('div')
        .eq(0)
        .children('a')
        .eq(0)
        .attr('href');

      const productElement = paginatedPageContent('.product')
        .eq(i)
        .children()
        .eq(1)
        .children('div')
        .eq(0)
        .children('span');

      const productElementData = {
        title: productElement.eq(0).text().replaceAll('\n', '').trim(),
        price: this.extractPrice(productElement.eq(2).text()),
      };

      let book;
      const bookPageUrl = this.publisherBaseUrl + productElementPageUrl;
      try {
        await sleep(1000);
        book = await this.getBookPageData(
          this.publisherBaseUrl + productElementPageUrl,
        );
      } catch (error) {
        console.log('Fetching book page failed: ', bookPageUrl);
        continue;
      }

      const newBookItem = {
        category: category.name,
        url: bookPageUrl,
        image: this.publisherBaseUrl + book.bookImage,
        ...productElementData,
        ...book.bookPageProductData,
      };

      books.push(newBookItem);
    }

    return books;
  }

  private async getBookPageData(url: string): Promise<object> {
    let bookPage, bookImage, bookPageProductData;
    try {
      bookPage = await this.generalScrapeService.getPage(url);

      bookImage = bookPage('.product-image')
        .children('img')
        .first()
        .attr('src');

      const bookPageTable =
        bookPage('.product-options').children('table.table');
      const trChildren = bookPageTable.children('tbody').children('tr');

      bookPageProductData = {
        writer: trChildren.eq(1).children('td').eq(1).text(),
        translator: trChildren.eq(2).children('td').eq(1).text(),
        round: trChildren.eq(4).children('td').eq(1).text(),
        pages: trChildren.eq(5).children('td').eq(1).text(),
        shabok: trChildren.eq(7).children('td').eq(1).text(),
      };

      return { bookImage, bookPageProductData };
    } catch (error) {
      throw error;
    }
  }

  private extractPrice(text: string): string {
    const extractedNumbers = text
      .replaceAll('\n', '')
      .replaceAll('\t', '')
      .replaceAll(',', '')
      .replace('تومان', '')
      .trim();

    const price = convertNumbersToEnglish(extractedNumbers);
    return price;
  }
}
