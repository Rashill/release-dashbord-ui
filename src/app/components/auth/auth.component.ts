import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error: Boolean;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      let oauth_token = this.route.snapshot.queryParamMap.get('oauth_token');
      let oauth_verifier = this.route.snapshot.queryParamMap.get(
        'oauth_verifier'
      );
      this.authService
        .authenticate({
          oauth_token: oauth_token,
          oauth_verifier: oauth_verifier
        })
        .pipe(
          map(res => res) // or any other operator
        )
        .subscribe(
          res => {
            console.log('res', res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/']);
          },
          error => {
            this.error = true;
            console.error('Error!', error);
            return throwError(error); // Angular 5/RxJS 5.5
          }
        );
    });
  }
  ngOnInit() {}
}
