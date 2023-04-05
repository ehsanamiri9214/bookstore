import { PartialType } from '@nestjs/mapped-types';
import { Invoice } from './../entities/invoice.entity';

export class UpdateInvoiceDto extends PartialType(Invoice) {}
