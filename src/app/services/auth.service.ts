import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  })
};
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/users'));
  }

  login(credentials) {
    return this.http.post<any>(
      environment.baseUrl + '/users/login',
      credentials
    );
  }

  register(user) {
    return this.http.post<any>(environment.baseUrl + '/users', user);
  }

  getAuthUrl() {
    return this.http.get<any>(environment.baseUrl + '/auth');
  }

  authenticate(auth) {
    console.log(auth);
    return this.http.post<any>(environment.baseUrl + '/auth', auth);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  getUserEmail() {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser() {
    var json='{"role":"SuperAdmin"}'
    var abc=JSON.parse(json);
    console.log("Hey "+abc.role)
    return JSON.parse(json);
  }
}
