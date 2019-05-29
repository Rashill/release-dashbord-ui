import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './Project';
import { Checklist } from './Checklist';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormWizardModule } from 'angular-wizard-form';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ReleaseService } from '../../../services/release.service';
import { DateValidator } from './dataValidator.service';

@NgModule({
  declarations: [CreateReleaseComponent],
  imports: [BrowserModule, FormWizardModule, NgbModule]
})
@Component({
  selector: 'ngbd-create-release',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateReleaseComponent implements OnInit {
  release: {
    name: string;
    releaseType: String;
    description: string;
    releaseDate: string;
    startDate: string;
    devFinishDate: string;
    refreshDate: string;
    regressionDeployDate: string;
    regressionStartDate: string;
    regressionEndDate: string;
    testEnvironment: string;
    cabDate: String;
    regEnvironment: string;
    sitecore: string;
    biztalk: string;
    devSupport: string;
    projects: any[];
    deploymentChampion: string;
    checklists: Array<Checklist>;
  };

  checklist: [];

  //these line contines input label which mapped to id
  //this is needed to store champion_name
  //this is needed to store devSupport_name
  displayLabel: {
    checklist;
    deploymentChampion;
    devSupport;
  };

  usersList;

  //either create or update
  mode: string = 'Create';
  releaseId: string;
  isCompleted: boolean = false;

  createForm: FormGroup;

  error: Boolean;
  errorMessage: string = '';

  steps = {
    step1: ['name', 'releaseType', 'description', 'releaseDate', 'cabDate'],
    step2: ['startDate', 'devFinishDate', 'refreshDate'],
    step3: ['regressionDeployDate', 'regressionStartDate', 'regressionEndDate'],
    step4: [
      'testEnvironment',
      'regEnvironment',
      'sitecore',
      'biztalk',
      'devSupport',
      'depchampionName'
    ],
    step5: []
  };

  validation_messages = {
    required: 'This is required field',
    dateInvalid: 'Date invalid',
    email: 'Invalid email format'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private releaseService: ReleaseService
  ) { }

  ngOnInit() {
    this.releaseId = this.route.snapshot.paramMap.get('id');

    this.error = false;

    this.release = {
      name: '',
      releaseType: '',
      description: '',
      releaseDate: '',
      startDate: '',
      devFinishDate: '',
      refreshDate: '',
      regressionDeployDate: '',
      regressionStartDate: '',
      regressionEndDate: '',
      testEnvironment: '',
      cabDate: '',
      regEnvironment: '',
      sitecore: '',
      biztalk: '',
      deploymentChampion: '',
      devSupport: '',
      projects: Array(),
      checklists: Array()
    };

    this.displayLabel = {
      checklist: {}, //schema: 58778kjkdfbkjlsfd: {contactPerson:'5778jksdjfnjksd7', dueDate: ''}
      deploymentChampion: '',
      devSupport: ''
    };

    this.initFormGroup();

    if (this.releaseId) {
      this.mode = 'Edit';
      this.loadAndFillControls();
    }
  }

  changeMode() {
    this.mode = this.mode == 'Edit' ? 'Create' : 'Edit';
    if (this.mode === 'Edit') {
      this.loadAndFillControls();
    } else {
      let attrs = Object.keys(this.release);
      attrs.forEach(attr => {
        this.release[attr] = '';
      });
    }
  }

  initFormGroup() {
    this.createForm = this.formBuilder.group(
      {
        name: new FormControl(this.release.name, [Validators.required]),
        description: new FormControl(this.release.description, [
          Validators.required
        ]),
        releaseType: new FormControl(this.release.releaseType, [
          Validators.required
        ]),
        releaseDate: new FormControl(this.release.releaseDate, [
          Validators.required
        ]),
        startDate: new FormControl(this.release.startDate, [
          Validators.required
        ]),
        devFinishDate: new FormControl(this.release.devFinishDate, [
          Validators.required
        ]),
        regressionDeployDate: new FormControl(
          this.release.regressionDeployDate,
          [
            //Validators.required
          ]
        ),
        refreshDate: new FormControl(this.release.refreshDate, [
          Validators.required
        ]),
        regressionStartDate: new FormControl(this.release.regressionStartDate, [
          Validators.required
        ]),
        regressionEndDate: new FormControl(this.release.regressionEndDate, [
          Validators.required
        ]),
        testEnvironment: new FormControl(this.release.testEnvironment, [
          Validators.required
        ]),
        cabDate: new FormControl(this.release.cabDate, [
          // Validators.required
        ]),
        regEnvironment: new FormControl(this.release.regEnvironment, [
          Validators.required
        ]),
        biztalk: new FormControl(this.release.biztalk, [Validators.required]),
        sitecore: new FormControl(this.release.sitecore, [Validators.required]),
        devSupport: new FormControl(this.release.devSupport, [
          Validators.required
        ]),
        depchampionName: new FormControl(this.release.deploymentChampion, [
          Validators.required
        ])
      },
      {
        // it validates the dates (check the imported service)
        validator: DateValidator('')
      }
    );
    //end of form gorup init.

    // load the users
    this.releaseService.getUsers().subscribe(
      res => {
        this.usersList = res[0];
      },
      error => { }
    );

    // load the checklist to create the html controls
    this.releaseService.getChecklists().subscribe(
      res => {
        let checklist = res[0];
        this.steps.step5 = [];
        for (let check of checklist) {
          // init. controls for the checklist and assignee
          this.createForm.addControl(
            check['_id'],
            new FormControl('', [Validators.required])
          );
          this.steps.step5.push(check['_id']);

          this.createForm.addControl(
            'contactPerson-' + check['_id'],
            new FormControl('', [Validators.required])
          );
          this.steps.step5.push('contactPerson-' + check['_id']);

          this.displayLabel.checklist[check['_id']] = {
            checklistId: check['_id'],
            dueDate: '',
            value: false
          };
        }
        this.checklist = checklist;
      },
      error => { }
    );

    this.createForm.controls['releaseType'].valueChanges.subscribe(type => {
      if (type == 'ER') {
        this.createForm.controls['cabDate'].setValidators([
          Validators.required
        ]);
        this.createForm.controls['regressionDeployDate'].setValidators([
          Validators.required
        ]);

        this.createForm.controls['cabDate'].enable();
        this.createForm.controls['regressionDeployDate'].enable();
      } else {
        this.createForm.controls['cabDate'].setValidators(null);
        this.createForm.controls['regressionDeployDate'].setValidators(null);

        this.createForm.controls['cabDate'].disable();
        this.createForm.controls['regressionDeployDate'].disable();
      }
      this.createForm.controls['cabDate'].updateValueAndValidity();
      this.createForm.controls['regressionDeployDate'].updateValueAndValidity();
      this.createForm.updateValueAndValidity();
    });

    //change next, previus and submit buttons style
    let buttons = document.querySelector('.card-footer');
    buttons.children[0].classList.replace('btn-secondary', 'btn-info');
    buttons.children[1].classList.replace('btn-secondary', 'btn-info');
    buttons.children[2].classList.replace('btn-secondary', 'btn-primary');

    //change overlfow-y styel from auto to visibel (fix dropdown overflow issue)
    let blocks = document.querySelectorAll('.card-block');
    blocks.forEach(el => {
      let block: HTMLElement = <HTMLElement>el;
      block.style.overflowY = "visible";
    });
  } 

  loadAndFillControls() {
    this.releaseService
      .getRelease(this.releaseId)
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          let res_release = res[0];
          console.log(res_release);
          let attrs = Object.keys(res_release);
          attrs.forEach(attr => {
            if (attr != '_id' && res_release[attr] != undefined) {
              if (attr == 'projects') {
                let vd = res_release[attr][0]['versionDetails'];
                this.release['name'] = vd.name;
                this.release['description'] = vd.description;
                this.release.startDate = vd.startDate;
              } else if (attr == 'checklists') {
                for (var i = 0; i < res_release[attr].length; i++) {
                  let check = res_release[attr][i];
                  this.displayLabel.checklist[check['checklistId']] = {
                    _id: check['_id'],
                    dueDate: check['dueDate'].substring(0, 10),
                    value: check['value'],
                    contactPerson_id: check['contactPerson'],
                    contactPerson: this.getUserDiplayNameById(
                      check['contactPerson']
                    )
                  };
                }
              } else if (attr == 'deploymentChampion' || attr == 'devSupport') {
                this.release[attr] = res_release[attr];
                this.displayLabel[attr] = this.getUserDiplayNameById(
                  res_release[attr]
                );
              } else {
                try {
                  this.release[attr] = res_release[attr].substring(0, 10);
                } catch (e) { }
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

    if (this.mode == 'Create') {
      this.createRelease();
    } else if (this.mode == 'Edit') {
      this.updateRelease();
    }
    this.isCompleted = true;
  }

  createRelease() {
    this.releaseService
      .getTeam()
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          console.log('response', res);
          console.log(res[0].length);
          for (var i = 0; i < res[0].length; i++) {
            this.release.projects.push(new Project(res[0][i].jiraProjectId));
          }

          for (var i = 0; i < this.checklist.length; i++) {
            let check = this.checklist[i];
            let data = this.displayLabel.checklist[check['_id']];
            this.release.checklists.push(
              new Checklist(
                undefined,
                check['_id'],
                data['value'],
                data['dueDate'],
                //set the value of contactPerson_id not the displayName "contactPerson"
                data['contactPerson_id']
              )
            );
          }

          console.log('Release: ', JSON.stringify(this.release));
          console.log('Mode: ' + this.mode);

          // this.release.devSupport = 'Test';
          // this.release.deploymentChampion = '5cc2a364e96bd81d60cd00dc';

          this.releaseService
            .createRelease(this.release)
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
                this.errorMessage = 'Error was rised by the server';//error.message;
                return throwError(error); // Angular 5/RxJS 5.5
              }
            );
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          this.errorMessage = error.message;
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }

  updateRelease() {

    for (var i = 0; i < this.checklist.length; i++) {
      let check = this.checklist[i];
      let data = this.displayLabel.checklist[check['_id']];
      this.release.checklists.push(
        new Checklist(
          data['_id'],
          check['_id'],
          data['value'],
          data['dueDate'],
          //set the value of contactPerson_id not the displayName "contactPerson"
          data['contactPerson_id']
        )
      );
    }

    delete this.release.projects;
    console.log('update release...');
    console.log(JSON.stringify(this.release));

    this.releaseService
      .patchRelease(this.releaseId, this.release)
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          console.log('response', res);
          this.router.navigate(['/release/' + this.releaseId]);
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          this.errorMessage = 'Error was rised by the server';//error.message;
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }

  /**
   * This is used to draw error flag in the invalid control
   * @param key control name
   */
  isValid(key) {
    if (
      this.createForm.controls[key] == undefined ||
      this.createForm.controls[key].disabled
    ) {
      return true;
    }
    return this.createForm.controls[key].valid;
  }

  /**
   * It validates multiple control for a given step
   * @param step e.g. step1
   */
  isValidStep(step) {
    if (step == 'done') {
      return this.createForm.valid;
    }

    let result = true;
    this.steps[step].forEach(key => {
      if (this.createForm.controls[key] == undefined) {
        result = result && true;
      } else {
        if (this.createForm.controls[key].errors == undefined) {
          result = result && true;
        } else {
          if (this.createForm.controls[key].valid) {
            result = result && true;
          } else {
            let dateInvalid =
              this.createForm.controls[key].errors.dateInvalid == true;
            result = result && dateInvalid;
            if (dateInvalid) {
              this.errorMessage = this.getValidationMsg(key);
            }
          }
        }
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
    if (errors == undefined) {
      return;
    }

    let validator = Object.keys(errors)[0];
    if (validator == 'dateInvalid') {
      return this.createForm.controls[key].errors['msg'];
    } else {
      return this.validation_messages[validator];
    }
  }

  // --------- related to autocomblite checklist assignee controlse
  filterAssignee = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? this.usersList.slice(0, 10)
          : this.usersList
            .filter(
              v =>
                v.displayName.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10)
      )
    );

  formatter = (x: { displayName: string }) => x;
  //----------- end of autocomblite checklist assignee controlse

  /**
   * It responds to assignee controls change.
   * It changes the value of a control from [Object] to displayName and update the contactPerson_id
   * @param event the assigned user object
   * @param _id check id
   */
  valueChanged(event, _id) {
    if (event && event._id !== undefined && event.displayName !== undefined) {
      this.displayLabel.checklist[_id].contactPerson_id = event._id;
      this.displayLabel.checklist[_id].contactPerson = event.displayName;
    }
  }

  /**
   * It responds to deployment champion, devSupport controls change.
   * It changes the value of a control form [Object] to displayName andd update the displayLabel[attr]
   * @param event the asigned user object
   */
  displayValueChanged(event, attr) {
    if (event._id !== undefined && event.displayName !== undefined) {
      this.release[attr] = event._id;
      this.displayLabel[attr] = event.displayName;
    }
  }

  /**
   * It returns the displayName of a given _id
   * @param _id contactPerson id
   */
  getUserDiplayNameById(_id) {
    let displayName = _id;
    this.usersList.forEach(el => {
      if (el._id == _id) {
        displayName = el.displayName;
        return;
      }
    });
    return displayName;
  }
}
