import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { User } from 'src/modules/user/entities/user.entity';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@GetUser() user: User): Promise<{ bankTransactionId: number }> {
    return this.invoiceService.createInvoice(user);
  }

  @Post('verifyPayment')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  verifyPayment(
    @Body('bankTransactionId') bankTransactionId: number,
    @GetUser() user: User,
  ): Promise<{ transactionStatus: number }> {
    return this.invoiceService.verifyPayment(bankTransactionId, user);
  }
}
