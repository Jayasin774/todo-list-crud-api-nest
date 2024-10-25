import { Injectable } from '@nestjs/common';
import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repository/todo.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findById(id: number): Promise<Todo | null> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Todo | null> {
    return this.todoRepository.findOne({ where: { title: name, isCompleted: false } });
  }

  async save(todo: Todo): Promise<void> {
    await this.todoRepository.save(todo);
  }

  async update(todo: Todo): Promise<void> {
    await this.todoRepository.save(todo);
  }

  async deleteById(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
