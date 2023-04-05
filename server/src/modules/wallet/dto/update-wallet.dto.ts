import { PartialType } from '@nestjs/mapped-types';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';

export class UpdateWalletDto extends PartialType(Wallet) {}
