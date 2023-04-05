import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { BaseService } from 'src/base/base.service';
import { Address } from 'src/modules/address/entities/address.entity';
import { CartService } from 'src/modules/cart/cart.service';
import { User } from 'src/modules/user/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {
    super(addressRepository);
  }

  async createNew(address: Address, user: User): Promise<Address> {
    const count = await this.findAll({ userId: user.id });
    if (count.length === 3)
      throw new ForbiddenException({
        msg: 'Exceed number of addresses.',
      });

    const newAddress = plainToInstance(Address, { ...address, user });
    const addressEntity = (await super.create(newAddress)) as Address;
    delete addressEntity.user;
    return addressEntity;
  }

  async removeAddress(id: number, userId: number): Promise<DeleteResult> {
    // TODO Check no active order exists with this address.

    const cart = await this.cartService.find({ userId, addressId: id });
    if (cart) {
      cart.addressId = null;
      cart.save();
    }

    return this.delete({ id, userId });
  }
}
