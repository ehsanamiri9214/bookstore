import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { CityService } from 'src/modules/city/city.service';
import { City } from 'src/modules/city/entities/city.entity';
import { State } from 'src/modules/state/entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService extends BaseService<State> {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    private readonly cityService: CityService,
  ) {
    super(stateRepository);
  }

  findCities(stateId: number): Promise<City[]> {
    return this.cityService.findAll({ stateId });
  }
}
