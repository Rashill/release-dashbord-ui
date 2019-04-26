import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  error: Boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      // logged in so return true
      console.log('route', route);
      return true;
    } else {
      this.authService
        .getAuthUrl()
        .pipe(
          map(res => res) // or any other operator
        )
        .subscribe(
          res => {
            console.log('URL', res.url);
            window.location.href = res.url;
            return;
          },
          error => {
            this.error = true;
            console.error('Error!', error);
            return throwError(error); // Angular 5/RxJS 5.5
          }
        );
      return false;
    }
    // not logged in so redirect to login page
  }
}
