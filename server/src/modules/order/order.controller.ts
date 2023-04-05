import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, IsAdmin } from 'src/guards';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderService } from 'src/modules/order/order.service';

@Controller('order')
@UseGuards(AuthGuard, IsAdmin)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: Order) {
    return this.orderService.create(createOrderDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  find(@Param('id') id: number) {
    return this.orderService.find({ id });
  }
}
