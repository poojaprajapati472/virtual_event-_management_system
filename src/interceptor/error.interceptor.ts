// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class ErrorInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle();
//   }
// }
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserNotFoundException } from './user.interceptor';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {

        if (error instanceof UserNotFoundException) {
          return throwError({
            message: error.message,
            status: HttpStatus.NOT_FOUND,
          });
        }
        return throwError({
          message: 'An error occurred during the request.',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }),
    );
  }
}
