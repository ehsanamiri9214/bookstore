import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/modules/user/entities/user.entity';

export class UpdateUserDto extends PartialType(User) {}
