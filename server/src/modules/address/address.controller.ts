import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators';
import { EntityEnum } from 'src/enums';
import { AuthGuard } from 'src/guards';
import { AddressService } from 'src/modules/address/address.service';
import { Address } from 'src/modules/address/entities/address.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('address')
@UseGuards(AuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() address: Address,
    @GetUser() user: User,
  ): Promise<Address> {
    return this.addressService.createNew(address, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(@GetUser() user: User): Promise<Address[]> {
    return this.addressService.findAll({ userId: user.id }, [
      EntityEnum.STATE,
      EntityEnum.CITY,
    ]);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.addressService.removeAddress(id, user.id);
  }
}
