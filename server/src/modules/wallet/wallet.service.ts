import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Wallet } from 'src/modules/wallet/entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {
    super(walletRepository);
  }
}
