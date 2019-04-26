import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
}
  from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from "./Project"
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormWizardModule } from 'angular-wizard-form';

import { ReleaseService } from '../../services/release.service'
import { DateValidator } from './dataValidator.service'

@NgModule({
  declarations: [
    CreateReleaseComponent
  ],
  imports: [
    BrowserModule,
    FormWizardModule
  ]
})

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

  steps = {
    step1: ['name', 'type', 'description', 'releaseDate'],
    step2: ['startDate', 'devfinish', 'refreshDate'],
    step3: ['regressionDeploy', 'regressionStart', 'regressionEnd'],
    step4: ['cabDate', 'testenvironment', 'regenvironment', 'sitecore', 'biztalk', 'devsupport']
  };

  validation_messages = { 'required': 'This is required field', 'dateInvalid': 'Date invalid' };


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


    this.createForm = this.formBuilder.group({
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
    }, {
        // it validates the dates (check the imported service)
        validator: DateValidator('')
      });
    //end of form gorup init.
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


  /**
   * This is used to draw error flag in the invalid control
   * @param key control name
   */
  isValid(key) {
    return this.createForm.controls[key].valid;// || !this.error;
  }

  /**
  * It validates multiple control for a given step
  * @param step e.g. step1
  */
  isValidStep(step) {
    let result = true;
    this.steps[step].forEach(key => {
      result = result && this.createForm.controls[key].valid;
    });
    return result;
  }

  /**
   * It returns validation message to be appear under the invalid control
   * @param key control name
   */
  getValidationMsg(key) {
    let errors = this.createForm.controls[key].errors;
    let validator = Object.keys(errors)[0];
    if(validator == 'dateInvalid'){
      return this.createForm.controls[key].errors['msg'];
    }else{
      return this.validation_messages[validator];
    }
  }
}

