import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { AuthGuard } from 'src/guards';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('orders')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  get(@GetUser() user: User) {
    return this.userService.findOrders(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(user, updateUserDto);
  }
}
