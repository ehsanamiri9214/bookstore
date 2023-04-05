import { PartialType } from '@nestjs/mapped-types';
import { Order } from 'src/modules/order/entities/order.entity';

export class UpdateOrderDto extends PartialType(Order) {}
