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
import { userInfo } from 'os';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  error: Boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authService.getUser() &&
      this.authService.getUser().role === 'SuperAdmin'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('/403');
      return false;
    }
  }
}
