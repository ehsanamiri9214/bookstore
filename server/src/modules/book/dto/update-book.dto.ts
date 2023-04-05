import { PartialType } from '@nestjs/mapped-types';
import { Book } from 'src/modules/book/entities/book.entity';

export class UpdateBookDto extends PartialType(Book) {}
