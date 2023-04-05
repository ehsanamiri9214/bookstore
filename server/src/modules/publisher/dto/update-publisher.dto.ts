import { PartialType } from '@nestjs/mapped-types';
import { Publisher } from 'src/modules/publisher/entities/publisher.entity';

export class UpdatePublisherDto extends PartialType(Publisher) {}
