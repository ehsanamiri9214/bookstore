import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { convertNumbersToEnglish, validatePhone } from 'src/utils';

@Injectable()
export class PhonePipe implements PipeTransform {
  constructor() {
    //
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const englishNumberedPhone = convertNumbersToEnglish(value);
    const result = validatePhone(englishNumberedPhone);
    if (result) return englishNumberedPhone;
    throw new BadRequestException({ msg: 'Phone number is not valid.' });
  }
}
