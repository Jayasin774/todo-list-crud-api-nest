import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Go to the gym', description: 'Title of the to do item' })
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString({ message: 'Title must be a string.' })
  @Length(5, 100, { message: 'Title must be between 5 and 100 characters long.' })
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiProperty({ example: 'Workout at the gym for 1 hour', description: 'Description of the todo item' })
  @IsNotEmpty({ message: 'Description is required.' })
  @IsString({ message: 'Description must be a string.' })
  @Length(0, 255, { message: 'Description must not exceed 255 characters.' })
  @Transform(({ value }) => value?.trim())
  description: string;
}
