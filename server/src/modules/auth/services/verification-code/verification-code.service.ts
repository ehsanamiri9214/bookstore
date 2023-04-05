import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { VerificationCode } from 'src/modules/auth/entities/verification-code.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationCodeService extends BaseService<VerificationCode> {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly vCodeRepository: Repository<VerificationCode>,
  ) {
    super(vCodeRepository);
  }
}
