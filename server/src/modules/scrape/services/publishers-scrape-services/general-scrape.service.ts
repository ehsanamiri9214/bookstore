import { Injectable } from '@nestjs/common';
import { CheerioAPI, load } from 'cheerio';

@Injectable()
export class GeneralScrapeService {
  async getPage(url: string): Promise<CheerioAPI> {
    try {
      const response = await fetch(url);
      const body = await response.text();
      const $ = load(body);
      return $;
    } catch (error) {
      throw error;
    }
  }
}
