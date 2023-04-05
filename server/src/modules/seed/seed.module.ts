import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { StateModule } from 'src/modules/state/state.module';
import { CityModule } from 'src/modules/city/city.module';
import { PublisherModule } from 'src/modules/publisher/publisher.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { BookModule } from 'src/modules/book/book.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [
    StateModule,
    CityModule,
    PublisherModule,
    CategoryModule,
    BookModule,
    AuthModule,
    UserModule,
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
