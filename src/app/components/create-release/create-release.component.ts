import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from "./Project"
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReleaseService } from '../../services/release.service'
@Component({
  selector: 'ngbd-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss']
})


export class CreateReleaseComponent implements OnInit {
  release: {
    name: string,
    type: String,
    description: string,
    releaseDate: string,
    startDate: string,
    devfinish: string,
    refreshDate: string,
    regressionDeploy: string,
    regressionStart: string,
    regressionEnd: string,
    testenvironment: string,
    cabDate: String,
    regenvironment: string,
    sitecore: string,
    biztalk: string,
    devsupport: string,
    projects: Array<Project>
    // projects:String
  };

  createForm: FormGroup;

  error: Boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private releaseService: ReleaseService) { }

  ngOnInit() {
    this.error = false;

    this.release = {
      name: '',
      type: '',
      description: '',
      releaseDate: '',
      startDate: '',
      devfinish: '',
      refreshDate: '',
      regressionDeploy: '',
      regressionStart: '',
      regressionEnd: '',
      testenvironment: '',
      cabDate: '',
      regenvironment: '',
      sitecore: '',
      biztalk: '',
      devsupport: '',
      projects: Array()
    };

    this.createForm = new FormGroup({
      name: new FormControl(this.release.name, [
        Validators.required
      ]),
      description: new FormControl(this.release.description, [
        Validators.required
      ]),
      type: new FormControl(this.release.type, [
        Validators.required
      ]),
      releaseDate: new FormControl(this.release.releaseDate, [
        Validators.required
      ]),
      startDate: new FormControl(this.release.startDate, [
        Validators.required
      ]),
      devfinish: new FormControl(this.release.devfinish, [
        Validators.required
      ]),
      regressionDeploy: new FormControl(this.release.regressionDeploy, [
        Validators.required
      ]),
      refreshDate: new FormControl(this.release.refreshDate, [
        Validators.required
      ]),
      regressionStart: new FormControl(this.release.regressionStart, [
        Validators.required
      ]),
      regressionEnd: new FormControl(this.release.regressionEnd, [
        Validators.required
      ]),
      testenvironment: new FormControl(this.release.testenvironment, [
        Validators.required
      ]),
      cabDate: new FormControl(this.release.cabDate, [
        Validators.required
      ]),
      regenvironment: new FormControl(this.release.regenvironment, [
        Validators.required
      ]),
      biztalk: new FormControl(this.release.biztalk, [
        Validators.required
      ]),
      sitecore: new FormControl(this.release.sitecore, [
        Validators.required
      ]),
      devsupport: new FormControl(this.release.devsupport, [
        Validators.required
      ])
    });
  }
  onSubmit() {
    this.createRelease();

  }
  createRelease() {

    this.releaseService.getTeam()
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          console.log('response', res);
          console.log(res[0].length)
          for (var i = 0; i < res[0].length; i++) {
            this.release.projects.push(new Project(res[0][i].jiraProjectId))
          }
          this.releaseService.createRelease(this.release)
            .pipe(
              map(res => res) // or any other operator
            )
            .subscribe(
              res => {
                console.log('response', res);
                this.router.navigate(['/']);
              },
              error => {
                this.error = true;
                console.error('Error!', error);
                return throwError(error); // Angular 5/RxJS 5.5
              }
            );
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }
}
