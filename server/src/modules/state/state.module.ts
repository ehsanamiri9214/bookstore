import { CityModule } from 'src/modules/city/city.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'src/modules/state/entities/state.entity';
import { StateController } from 'src/modules/state/state.controller';
import { StateService } from 'src/modules/state/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([State]), CityModule],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
