import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(
  OmitType(CreateArticleDto, ['author_id']),
) {}
