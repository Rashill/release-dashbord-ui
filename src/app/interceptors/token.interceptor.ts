import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('auth')) {
      if (localStorage.getItem('token')) {
        request = request.clone({
          setHeaders: {
            Authorization: localStorage.getItem('token')
          }
        });
        return next.handle(request).pipe(
          catchError(error => {
            if (error.status === 401 || error.status === 403) {
              // handle error
              console.log('error', error);
            }
            return throwError(error);
          })
        );
      } else {
        this.authService
          .getAuthUrl()
          .pipe(
            map(res => res) // or any other operator
          )
          .subscribe(
            res => {
              window.location.href = res.url;
              return event;
            },
            error => {
              console.error('Error!', error);
              return throwError(error); // Angular 5/RxJS 5.5
            }
          );
      }
    } else {
      return next.handle(request);
    }
  }
}
