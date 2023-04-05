import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CityService } from 'src/modules/city/city.service';
import { City } from 'src/modules/city/entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<City[]> {
    return this.cityService.findAll({});
  }
}
