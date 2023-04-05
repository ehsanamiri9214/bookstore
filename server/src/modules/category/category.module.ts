import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from 'src/modules/book/book.module';
import { CategoryController } from 'src/modules/category/category.controller';
import { CategoryService } from 'src/modules/category/category.service';
import { Category } from 'src/modules/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), BookModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
