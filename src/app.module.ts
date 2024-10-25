import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './application/service/todo.service';
import { TodoController } from './infrastructure/controller/todo.controller';
import { TypeOrmTodoRepository } from './infrastructure/persistence/typeorm-todo.repository';
import { Todo } from './domain/entities/todo.entity';
import { TODO_REPOSITORY } from './domain/repository/todo-repository.token';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // Change this to your preferred database
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME, // Change this to your DB username
      password: process.env.DB_PASSWORD, // Change this to your DB password
      database: process.env.DB_DATABASE, // Change this to your DB name
      entities: [Todo],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodoController],
  providers: [
    TodoService,
    { provide: TODO_REPOSITORY, useClass: TypeOrmTodoRepository },
  ],
})
export class AppModule {}
