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

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

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
    const author = await this.authorRepository.findOneBy({ id });
    if (author === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `author with id ${id} does not exists`,
      });
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOneBy({ id });
    if (author === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `author with id ${id} does not exists`,
      });
    }
    return await this.authorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOneBy({ id });
    if (author === null) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `author with id ${id} does not exists`,
      });
    }
    return await this.authorRepository.delete(id);
  }
}
