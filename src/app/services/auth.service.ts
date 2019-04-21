import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { map } from 'rxjs/operators';

import decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return forkJoin(this.http.get<any>('/api/v1/users'));
  }

  login(credentials) {
    return this.http.post<any>('/api/v1/users/login', credentials);
  }

  register(user) {
    return this.http.post<any>('/api/v1/users', user);
  }

  auth() {
    return this.http.get<any>('/api/v1/auth');
  }

  //   forgotPassword(email) {
  //     return this.http.post<any>('/api/v1/auth/forgot-password', {
  //       email: email
  //     });
  //   }

  //   resetPassword(password, token) {
  //     return this.http.post<any>('/api/v1/auth/reset-password/' + token, {
  //       password: password
  //     });
  //   }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  // getUserRole() {
  //   if (localStorage.getItem('token')) {
  //     return decode(localStorage.getItem('token')).role;
  //   }
  // }

  getUserEmail() {
    return localStorage.getItem('username');
  }

  // getUserId() {
  //   if (localStorage.getItem('token')) {
  //     // console.log(decode(localStorage.getItem('token')));
  //     return decode(localStorage.getItem('token'))._id;
  //   }
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
