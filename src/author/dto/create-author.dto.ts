import { OmitType } from '@nestjs/mapped-types';
import { Author } from '../entities/author.entity';

export class CreateAuthorDto extends OmitType(Author, ['id']) {}
