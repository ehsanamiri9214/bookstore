import { Module } from '@nestjs/common';
import { RoshdScrapeService } from 'src/modules/scrape/services/publishers-scrape-services/roshd-scrape.service';
import { ScrapeController } from './scrape.controller';
import { GeneralScrapeService } from './services/publishers-scrape-services/general-scrape.service';
import { ScrapeService } from './services/scrape.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [ScrapeController],
  providers: [ScrapeService, GeneralScrapeService, RoshdScrapeService],
  exports: [ScrapeService, GeneralScrapeService, RoshdScrapeService],
})
export class ScrapeModule {}
