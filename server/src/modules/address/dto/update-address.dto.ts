import { PartialType } from '@nestjs/mapped-types';
import { Address } from 'src/modules/address/entities/address.entity';

export class UpdateAddressDto extends PartialType(Address) {}
