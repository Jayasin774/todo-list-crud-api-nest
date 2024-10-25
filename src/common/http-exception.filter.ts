import {
    ExceptionFilter,
    Catch,
    HttpException,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const apiResponse: ApiResponse<null> = {
            statusCode: status,
            message: exception.message || 'Internal Server Error',
            error: exception.getResponse() as string,
        };

        response.status(status).json(apiResponse);
    }
}
