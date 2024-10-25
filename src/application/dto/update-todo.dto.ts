import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string.' })
  @Length(5, 100, { message: 'Title must be between 5 and 100 characters long.' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @Length(0, 255, { message: 'Description must not exceed 255 characters.' }) // Length validation
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isCompleted must be a boolean value.' }) // Validate if provided
  isCompleted?: boolean;
}
