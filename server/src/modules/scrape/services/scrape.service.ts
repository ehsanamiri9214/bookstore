import { Injectable } from '@nestjs/common';
import { RoshdScrapeService } from 'src/modules/scrape/services/publishers-scrape-services/roshd-scrape.service';

@Injectable()
export class ScrapeService {
  constructor(private readonly roshdScrapeService: RoshdScrapeService) {}

  async scrape(): Promise<void> {
    await this.roshdScrapeService.scrape();
  }
}
