import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, IsAdmin } from 'src/guards';
import { ScrapeService } from './services/scrape.service';

@Controller('scrape')
@UseGuards(AuthGuard, IsAdmin)
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async seedAll(): Promise<void> {
    return this.scrapeService.scrape();
  }
}
