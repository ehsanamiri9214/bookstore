import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/modules/book/book.module';
import { Publisher } from 'src/modules/publisher/entities/publisher.entity';
import { PublisherController } from 'src/modules/publisher/publisher.controller';
import { PublisherService } from 'src/modules/publisher/publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher]), BookModule],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
