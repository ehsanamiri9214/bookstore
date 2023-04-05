import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, IsAdmin } from 'src/guards';
import { SeedService } from './seed.service';

@Controller('seed')
@UseGuards(AuthGuard, IsAdmin)
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async seedAll(): Promise<void> {
    return this.seedService.seedAll();
  }
}
