import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoService } from '../../application/service/todo.service';
import { CreateTodoDto } from '../../application/dto/create-todo.dto';
import { UpdateTodoDto } from '../../application/dto/update-todo.dto';
import { Todo } from '../../domain/entities/todo.entity';
import { ApiResponse as ApiRes } from 'src/common/response.interface';

@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @ApiOperation({ summary: 'Create a new todo item' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The todo item has been successfully created' })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<ApiRes<Todo>> {
    await this.todoService.createTodo(createTodoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Todo item created successfully',
    }
  }

  @ApiOperation({ summary: 'Get all todo items' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of todo items', type: [Todo] })
  @Get()
  async findAll(): Promise<ApiRes<Todo[]>> {
    const todoLists = await this.todoService.findAll();
    if (todoLists.length === 0) {
      return {
        statusCode: HttpStatus.OK,
        message: 'No todo items found',
        data: [],
      }
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'List of todo items',
      data: todoLists,
    }
  }

  @ApiOperation({ summary: 'Get a todo item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The todo item found', type: Todo })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ApiRes<Todo> | null> {
    const todo = await this.todoService.findById(id);
    if (!todo) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Todo item not found',
      }
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo item found',
      data: todo,
    }
  }

  @ApiOperation({ summary: 'Update a todo item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The todo item has been successfully updated', type: Todo })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<ApiRes<Todo> | null> {
    const updatedTodo = await this.todoService.updateTodo(id, updateTodoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Todo item updated successfully',
      data: updatedTodo,
    }
  }

  @ApiOperation({ summary: 'Delete a todo item by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The todo item has been successfully deleted' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<ApiRes<null>> {
    await this.todoService.deleteTodo(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Todo item deleted successfully',
    }
  }
}
