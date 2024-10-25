import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repository/todo.repository';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TODO_REPOSITORY } from 'src/domain/repository/todo-repository.token';

@Injectable()
export class TodoService {
  constructor(@Inject(TODO_REPOSITORY) private readonly todoRepository: TodoRepository) { }

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo(createTodoDto?.title?.trim(), createTodoDto?.description?.trim());
    const existingTodo = await this.todoRepository.findByName(createTodoDto?.title?.trim());
    if (existingTodo) {
      throw new ConflictException(`A todo with the title ${createTodoDto.title} already exists.`);
    }
    if (createTodoDto.title.trim().length < 5) {
      throw new BadRequestException('Title must be at least 5 characters long.');
    }
    if (createTodoDto.title.trim().length > 100) {
      throw new BadRequestException('Title must not exceed 100 characters.');
    }
    if (createTodoDto.title.trim().length < 5) {
      throw new BadRequestException('Title must be at least 5 characters long.');
    }
    if (createTodoDto.title.trim().length > 100) {
      throw new BadRequestException('Title must not exceed 100 characters.');
    }
    await this.todoRepository.save(todo);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async findById(id: number): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (updateTodoDto?.title?.trim() === '' || updateTodoDto?.description?.trim() === '' ) {
      throw new BadRequestException('Title and description cannot be empty');
    }

    if (updateTodoDto.title) {
      const existingTodo = await this.todoRepository.findByName(updateTodoDto.title);
      if (existingTodo && existingTodo.id !== id) {
        throw new ConflictException(`A todo with the title ${updateTodoDto.title} already exists.`);
      }
      todo.title = updateTodoDto.title;
    }

    if (updateTodoDto.description) {
      todo.description = updateTodoDto.description;
    }
    
    if (updateTodoDto.isCompleted !== undefined) {
      if (typeof updateTodoDto.isCompleted !== 'boolean') {
        throw new BadRequestException('isCompleted must be a boolean.');
      }
      todo.isCompleted = updateTodoDto.isCompleted;
    }

    await this.todoRepository.update(todo);
    return todo;
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo item not found for the id ${id}`);
    }
    await this.todoRepository.deleteById(id);
  }
}
