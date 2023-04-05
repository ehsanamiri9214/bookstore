import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { appConfig, authConfig } from 'src/config';
import { AddressModule } from 'src/modules/address/address.module';
import { AppController } from 'src/modules/app/app.controller';
import { AppService } from 'src/modules/app/services/app/app.service';
import { TextSearchService } from 'src/modules/app/services/text-search/text-search.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { BookModule } from 'src/modules/book/book.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { CityModule } from 'src/modules/city/city.module';
import { InvoiceModule } from 'src/modules/invoice/invoice.module';
import { OrderModule } from 'src/modules/order/order.module';
import { PublisherModule } from 'src/modules/publisher/publisher.module';
import { ScrapeModule } from 'src/modules/scrape/scrape.module';
import { GeneralScrapeService } from 'src/modules/scrape/services/publishers-scrape-services/general-scrape.service';
import { RoshdScrapeService } from 'src/modules/scrape/services/publishers-scrape-services/roshd-scrape.service';
import { ScrapeService } from 'src/modules/scrape/services/scrape.service';
import { SeedModule } from 'src/modules/seed/seed.module';
import { StateModule } from 'src/modules/state/state.module';
import { UserModule } from 'src/modules/user/user.module';
import { WalletModule } from 'src/modules/wallet/wallet.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DbService } from './services/db/db.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig.default, authConfig.default],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get('DATABASE_TYPE'),
          host: config.get('DATABASE_HOST'),
          port: +config.get('DATABASE_PORT'),
          database: config.get('DATABASE_NAME'),
          username: config.get('DATABASE_USERNAME'),
          password: config.get('DATABASE_PASSWORD'),
          entities: [config.get('DATABASE_ENTITIES')],
          migrations: [config.get('DATABASE_MIGRATIONS')],
          synchronize:
            config.get('DATABASE_SYNCHRONIZE').toLowerCase() === 'true',
          dropSchema:
            config.get('DATABASE_DROP_SCHEMA').toLowerCase() === 'true',
          logging: config.get('DATABASE_LOGGING') === 'true',
        } as MysqlConnectionOptions;
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
    }),
    ScheduleModule.forRoot(),
    AddressModule,
    AuthModule,
    BookModule,
    CartModule,
    CategoryModule,
    CityModule,
    InvoiceModule,
    OrderModule,
    PublisherModule,
    ScrapeModule,
    SeedModule,
    StateModule,
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    ScrapeService,
    GeneralScrapeService,
    RoshdScrapeService,
    TextSearchService,
    DbService,
  ],
})
export class AppModule {}
