import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { City } from 'src/modules/city/entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {
    super(cityRepository);
  }
}
