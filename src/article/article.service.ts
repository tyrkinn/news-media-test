import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const existingArticle = await this.articlesRepository.findOneBy({
      title: createArticleDto.title,
    });
    if (existingArticle) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: `Article with title: "${createArticleDto.title}" already registered.`,
        element: 'title',
      });
    }
    const newArticle = this.articlesRepository.create(createArticleDto);
    return await this.articlesRepository.save(newArticle);
  }

  async findAll() {
    return await this.articlesRepository.find();
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOneBy({ id });
    if (article === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Article with id ${id} does not exists`,
      });
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.articlesRepository.findOneBy({ id });
    if (article === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Article with id ${id} does not exists`,
      });
    }
    return await this.articlesRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    const article = await this.articlesRepository.findOneBy({ id });
    if (article === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Article with id ${id} does not exists`,
      });
    }
    this.articlesRepository.delete(id);
  }
}
