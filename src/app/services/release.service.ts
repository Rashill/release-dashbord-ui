import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReleaseService {

  constructor(private http: HttpClient) { }

  getTeam() {
    return forkJoin(this.http.get<any>('/api/v1/team'));
  }

  createRelease(release) {
    console.log(release)
    return forkJoin(this.http.post<any>('/api/v1/release',release));
  }
}
