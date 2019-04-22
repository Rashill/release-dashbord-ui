import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
// Google analytics global variable
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class.loading') loading = false;
  error: Boolean;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.route.queryParams.subscribe(params => {
          let oauth_token = this.route.snapshot.queryParamMap.get('oauth_token');
          let oauth_verifier = this.route.snapshot.queryParamMap.get('oauth_verifier');
          var auth = { "oauth_token": oauth_token, "oauth_verifier": oauth_verifier };

          // if (localStorage.getItem("Token")) {
          //   localStorage.clear()
          //   console.log(localStorage.getItem("Token"))
          // }
          // else if (oauth_verifier == null) {
          //   this.authService
          //     .authURL()
          //     .pipe(
          //       map(res => res) // or any other operator
          //     )
          //     .subscribe(
          //       res => {
          //         console.log('URL', res.url)
          //         window.location.href = res.url 
          //         return
          //       },
          //       error => {
          //         this.error = true;
          //         console.error('Error!', error);
          //         return throwError(error); // Angular 5/RxJS 5.5
          //       });
          // }
          // else {
          //   this.authService
          //     .auth({ "oauth_token": oauth_token, "oauth_verifier": oauth_verifier }
          //     )
          //     .pipe(
          //       map(res => res) // or any other operator
          //     )
          //     .subscribe(
          //       res => {
          //         localStorage.setItem("Token", res.token)
          //       },
          //       error => {
          //         this.error = true;
          //         console.error('Error!', error);
          //         return throwError(error); // Angular 5/RxJS 5.5
          //       });
          // }

        })
      }
    });
  }
}
