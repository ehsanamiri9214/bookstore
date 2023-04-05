import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Order } from 'src/modules/order/entities/order.entity';
import { OrderService } from 'src/modules/order/order.service';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly orderService: OrderService,
  ) {
    super(userRepository);
  }

  findOrders(user: User): Promise<Order[]> {
    return this.orderService.findMany({ userId: user.id });
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    await this.update({ id: user.id }, updateUserDto);
    return this.find({ id: user.id });
  }
}
