// import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
// import { any } from 'joi';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class ErrorInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       catchError(error => {
//         if (error instanceof HttpException) {
//           // Handle known HTTP exceptions (e.g., BadRequestException, NotFoundException, etc.)
//           return throwError(error=any)}
//           else {
//           // Handle other unexpected errors
//           return throwError(new HttpException('Internal Server Error', 500));
//         }
//       }),
//     );
//   }
// }