import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo | null>;
  findByName(name: string): Promise<Todo | null>;
  save(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  deleteById(id: number): Promise<void>;
}
