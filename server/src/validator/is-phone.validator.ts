import { BadRequestException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { convertNumbersToEnglish, validatePhone } from 'src/utils';

export function IsPhone(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPhone',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];

          const englishNumberedPhone = convertNumbersToEnglish(value);
          const result = validatePhone(englishNumberedPhone);

          return Boolean(result);
        },
      },
    });
  };
}
