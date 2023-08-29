import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Article } from 'src/article/entities/article.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  avatar_url: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
