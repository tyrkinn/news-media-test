import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { Article } from 'src/article/entities/article.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Article) private articlesRepository: Repository<Article>,
  ) {}

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

  async create(createAuthorDto: CreateAuthorDto) {
    const existingAuthor = await this.authorRepository.findOne({
      where: { name: createAuthorDto.name },
    });

    if (existingAuthor) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: `Author with name: "${createAuthorDto.name}" already registered.`,
        element: 'name',
      });
    }

    const newAuthor = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(newAuthor);
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.tryGetAuthor(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await this.tryGetAuthor(id);
    return await this.authorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    await this.tryGetAuthor(id);
    return await this.authorRepository.delete(id);
  }

  async allArticles(id: number) {
    await this.tryGetAuthor(id);
    return await this.articlesRepository.find({
      where: {
        author: {
          id,
        },
      },
    });
  }
}
