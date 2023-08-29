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
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  private async tryGetArticle(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (article === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Article with id ${id} does not exists`,
      });
    }
    return article;
  }

  private async tryGetAuthor(id: number): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ id });
    if (author === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Author with id ${id} does not exists`,
      });
    }
    return author;
  }

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
    const author = await this.tryGetAuthor(createArticleDto.authorId);
    const newArticle = this.articlesRepository.create(createArticleDto);
    newArticle.author = author;
    return await this.articlesRepository.save(newArticle);
  }

  async findAll() {
    return await this.articlesRepository.find();
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });
    if (article === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `Article with id ${id} does not exists`,
      });
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.tryGetArticle(id);
    return await this.articlesRepository.update(id, updateArticleDto);
  }

  async remove(id: number) {
    await this.tryGetArticle(id);
    return await this.articlesRepository.delete(id);
  }
}
