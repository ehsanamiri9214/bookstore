import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CityService } from 'src/modules/city/city.service';
import { City } from 'src/modules/city/entities/city.entity';
import { State } from 'src/modules/state/entities/state.entity';
import { StateService } from 'src/modules/state/state.service';

@Controller('state')
export class StateController {
  constructor(
    private readonly stateService: StateService,
    private readonly cityService: CityService,
  ) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<State[]> {
    return this.stateService.findAll({});
  }

  @Get('/:id/cities')
  @HttpCode(HttpStatus.OK)
  getCities(@Param('id') id: number): Promise<City[]> {
    return this.stateService.findCities(id);
  }
}
