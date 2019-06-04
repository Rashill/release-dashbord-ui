import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';

@Injectable()
export class ReleaseService {
  constructor(private http: HttpClient) {}

  getTeam() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/team'));
  }

  createRelease(release) {
    console.log(release);
    return forkJoin(
      this.http.post<any>(environment.baseUrl + '/release', release)
    );
  }

  getReleases() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/release'));
  }

  getRelease(releaseId) {
    return forkJoin(
      this.http.get<any>(environment.baseUrl + '/release/' + releaseId)
    );
  }

  updateRelease(releaseId, release) {
    return forkJoin(
      this.http.put<any>(
        environment.baseUrl + '/release/' + releaseId,
        release
      )
    );
  }

  editRelease(release) {
    console.log('release', release);
    console.log('editrelease');
    return forkJoin(
      this.http.patch<any>(
        environment.baseUrl + '/release/' + release._id,
        release
      )
    );
  }

  patchRelease(releaseId, release) {
    console.log('release', release);
    console.log(releaseId);
    return forkJoin(
      this.http.patch<any>(
        environment.baseUrl + '/release/' + releaseId,
        release
      )
    );
  }

  getChecklists() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/checklist'));
  }

  getUsers() {
    return forkJoin(this.http.get<any>(environment.baseUrl + '/user'));
  }

  downloadFile(fileId) {
    // console.log('file', file);
    return forkJoin(
      this.http.get<any>(environment.baseUrl + '/file/' + fileId)
    );
  }
}
