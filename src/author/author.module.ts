import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Article])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
