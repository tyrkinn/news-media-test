import { IsString } from 'class-validator';
import { Author } from 'src/author/entities/author.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  content: string;

  @ManyToOne(() => Author, (author) => author.articles)
  @JoinColumn()
  author: Author;
}
