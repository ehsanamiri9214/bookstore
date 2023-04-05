import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from 'src/modules/city/city.controller';
import { CityService } from 'src/modules/city/city.service';
import { City } from 'src/modules/city/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
