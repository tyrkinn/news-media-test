# News Media Test Task

## Тестовое задание

### Задача:

Создать приложение для работы с двумя связанными сущностями.

Сущности:

1. Автор

Поля:

- Имя - текст
- url аватара - текст

2. Статья

Поля:

- Заголовок - текст
- Содержимое - текст
- Автор

Нужно добавить CRUD роуты для сущностей Автор и Статья.

Должны быть использованы:
- Docker
- NodeJS 18,
- NestJS,
- TypeOrm,
- Postgres 14

Приложение и БД должно запускаться с помощью docker compose

## Маршруты

### authors

- GET /authors/ - Получить всех авторов
- GET /authors/:id - Получить конкретного автора
- GET /authors/:id/articles - Получить все статьи автора

- POST /authors/ - Добавить автора (Тело: `{ name: string, avatarUrl: string }`)
- PUT /authors/:id - Обновить автора (Тело: `{ name?: string, avatarUrl?: string }`)
- DELETE /authors/:id - Удалить автора


### articles
- GET /articles/ - Получить все статьи
- GET /articles/:id - Получить конеретную статью с информацией об авторe

- POST /articles/ - Добавить статью (Тело: `{ title: string, content: string, authorId: number }`)
- PUT /articles/:id - Обновить статью (Тело: `{ title?: string, content?: string }`)
- DELETE /articles/:id - Удалить статью


## Запуск

1. Переименовать `.env.example` в `.env`

2.
```bash
$ docker-compose up -d
```
