import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  authorId: number;
}
