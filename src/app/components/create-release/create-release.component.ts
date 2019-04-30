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

  //either create or update
  mode: string= 'Create';
  releaseId: string = '';
  isCompleted: boolean = false;

  createForm: FormGroup;

  error: Boolean;

  steps = {
    step1: ['name', 'type', 'description', 'releaseDate', 'cabDate'],
    step2: ['startDate', 'devfinish', 'refreshDate'],
    step3: ['regressionDeploy', 'regressionStart', 'regressionEnd'],
    step4: ['testenvironment', 'regenvironment', 'sitecore', 'biztalk', 'devsupport']
  };

  validation_messages = { 'required': 'This is required field', 'dateInvalid': 'Date invalid' };


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private releaseService: ReleaseService) { }

  ngOnInit() {
   // this.releaseId = '5cbfad638fc519175a4c7d66'
   let url_splitted = this.router.url.split('/');

   if(url_splitted.length == 4){
    this.releaseId = url_splitted[3];
   }

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

    this.initFormGroup();

    if(this.releaseId.length>0){
      this.mode = 'Edit'
      this.loadAndFillControls();
    }
  }

  changeMode(){
    this.mode = this.mode == 'Edit'? 'Create': 'Edit';
    if(this.mode == 'Edit'){
      this.loadAndFillControls();
    }else{
      let attrs = Object.keys(this.release);
      attrs.forEach(attr => {
        this.release[attr]= '';
      });
    }
  }

  initFormGroup(){
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
        //Validators.required
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
       // Validators.required
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


    this.createForm.controls['type'].valueChanges.subscribe(type => {
      if (type == 'ER') {
        this.createForm.controls['cabDate'].setValidators([Validators.required]);
        this.createForm.controls['regressionDeploy'].setValidators([Validators.required]);

        this.createForm.controls['cabDate'].enable();
        this.createForm.controls['regressionDeploy'].enable();
      }else{
        this.createForm.controls['cabDate'].setValidators(null);
        this.createForm.controls['regressionDeploy'].setValidators(null);

        this.createForm.controls['cabDate'].disable();
        this.createForm.controls['regressionDeploy'].disable();
      }
      this.createForm.controls['cabDate'].updateValueAndValidity();
      this.createForm.controls['regressionDeploy'].updateValueAndValidity();
      this.createForm.updateValueAndValidity();
    });

    //change next, previus and submit buttons style
    let buttons = document.querySelector('.card-footer');
    buttons.children[0].classList.replace('btn-secondary', 'btn-info');
    buttons.children[1].classList.replace('btn-secondary', 'btn-info');
    buttons.children[2].classList.replace('btn-secondary', 'btn-primary');

  }

  loadAndFillControls(){
    let url = '/release/' + this.releaseId;
    console.log(url);
    this.releaseService.getRelease(url)
    .pipe(
      map(res => res) // or any other operator
    )
    .subscribe(
      res => {
        let res_release = res[0];
        console.log(res_release);
        let attrs = Object.keys(res_release);
        attrs.forEach(attr => {
          if(attr != '_id' && res_release[attr] != undefined){
            if(attr == 'projects'){
              let vd = (res_release[attr][0])['versionDetails'];
              this.release['name'] = vd.name;
              let type = ''
              if((vd.name).indexOf('OOC')>-1){
                type = 'OOC'
              }else if((vd.name).indexOf('ER')>-1){
                type = 'ER'
              }else if((vd.name).indexOf('Hot Fix')>-1){
                type = 'Hot Fix'
              }
              this.release.type = type;
              this.release['description'] = vd.description;

            }else{
              try{
                this.release[attr] = (res_release[attr]).substring(0,10);
              }catch(e){}
            }
          }
        });
      },
      error => {
        this.error = true;
        console.error('Error!', error);
        return throwError(error); // Angular 5/RxJS 5.5
      }
    );
  }


  onSubmit() {
    console.log(this.release);
    console.log(this.mode);

    if(this.mode == 'Create'){
      this.createRelease();
    }else if(this.mode == 'Edit'){
      this.updateRelease();
    }
    this.isCompleted = true;
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

  updateRelease() {
    this.releaseService.getTeam()
    .subscribe(
        res => {
          console.log('response', res);
          console.log(res[0].length)
          for (var i = 0; i < res[0].length; i++) {
            this.release.projects.push(new Project(res[0][i].jiraProjectId))
          }
          this.releaseService.updateRelease(this.releaseId, this.release)
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
    if(this.createForm.controls[key] == undefined || this.createForm.controls[key].disabled){
      return true;
    }
    return this.createForm.controls[key].valid;
  }

  /**
  * It validates multiple control for a given step
  * @param step e.g. step1
  */
  isValidStep(step) {
    let result = true;
    this.steps[step].forEach(key => {
      if(this.createForm.controls[key] == undefined){
        result = result && true;
      }else{
        result = result && !(this.createForm.controls[key].errors && !this.createForm.controls[key].errors.dateInvalid);//this.createForm.controls[key].valid;
      }
    });
    return result;
  }

  /**
   * It returns validation message to be appear under the invalid control
   * @param key control name
   */
  getValidationMsg(key) {
    let errors = this.createForm.controls[key].errors;
    if(errors == undefined){
      return;
    }

    let validator = Object.keys(errors)[0];
    if(validator == 'dateInvalid'){
      return this.createForm.controls[key].errors['msg'];
    }else{
      return this.validation_messages[validator];
    }
  }
}

