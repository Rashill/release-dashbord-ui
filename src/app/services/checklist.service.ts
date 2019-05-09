import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';

@Injectable()
export class ChecklistService {
  constructor(private http: HttpClient) {}

  getChecklists() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/checklist'));
  }
}
