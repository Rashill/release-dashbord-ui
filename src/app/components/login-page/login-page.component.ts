import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {
  credentials: {
    username: string;
    password: string;
  };

  signinForm: FormGroup;

  error: Boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.error = false;

    this.credentials = {
      username: '',
      password: ''
    };

    this.signinForm = new FormGroup({
      username: new FormControl(this.credentials.username, [
        Validators.required
      ]),
      password: new FormControl(this.credentials.password, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    this.login();
  }

  login() {
    this.authService
      .login(this.credentials)
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          console.log('response', res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('username', res.user.username);
          this.router.navigate(['/']);
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }
}
