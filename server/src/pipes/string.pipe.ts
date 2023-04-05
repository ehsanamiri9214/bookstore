import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const result = value.length;
    if (result) {
      return value;
    }
    throw new BadRequestException({ msg: 'String is not valid.' });
  }
}
