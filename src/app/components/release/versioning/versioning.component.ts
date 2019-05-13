import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../create/Project';
import { Checklist } from '../create/Checklist';
import { FormWizardModule } from 'angular-wizard-form';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { ReleaseService } from '../../../services/release.service';


@Component({
  selector: 'app-versioning',
  templateUrl: './versioning.component.html',
  styleUrls: ['./versioning.component.scss']
})
export class VersioningComponent implements OnInit {
  release: {
    versioning: {
      sitecore: string;
      SPA: String;
      biztalkWCF: string;
    };
  };


  //either create or update
  mode: string = 'Create';
  releaseId: string;
  verForm: FormGroup;


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
  ) {}

  ngOnInit() {
    this.releaseId = this.route.snapshot.paramMap.get('id');
    console.log(this.releaseId);

    this.release = {
      versioning: {
        sitecore: '',
        SPA: '',
        biztalkWCF: ''
      }
    };

    this.initFormGroup();

    if (this.releaseId.length > 0) {
      this.mode = 'Edit';
      this.loadAndFillControls();
    }

  }


    initFormGroup() {
      this.verForm = this.formBuilder.group(
        {
          sitecore: new FormControl(this.release.versioning.sitecore, [
          //  Validators.required
          ]),
          SPA: new FormControl(this.release.versioning.SPA, [
          //  Validators.required
          ]),
          biztalkWCF: new FormControl(this.release.versioning.biztalkWCF, [
          //  Validators.required
          ])
        }
      );
      //end of form gorup init.
    }

    loadAndFillControls() {
      this.releaseService
        .getRelease(this.releaseId)
        .pipe(
          map(res => res) // or any other operator
        )
        .subscribe(
          res => {
            console.log(res);
            if(res[0].versioning != undefined){
              this.release.versioning = res[0].versioning;
            }
          },
          error => {
            return throwError(error); // Angular 5/RxJS 5.5
          }
        );
    }


    onSubmit() {
      if (this.mode == 'Create') {
        //this.createRelease();
      } else if (this.mode == 'Edit') {
        this.update();
      }
    }



  update() {
    console.log('Update......');
    console.log(this.release);
      this.releaseService
        .editRelease(this.releaseId, {"versioning": this.release.versioning})
        .pipe(
          map(res => res) // or any other operator
        )
        .subscribe(
          res => {
            this.router.navigate(['/release/' + this.releaseId]);
          },
          error => {
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
      this.verForm.controls[key] == undefined ||
      this.verForm.controls[key].disabled
    ) {
      return true;
    }
    return this.verForm.controls[key].valid;
  }

  /**
   * It returns validation message to be appear under the invalid control
   * @param key control name
   */
  getValidationMsg(key) {
    let errors = this.verForm.controls[key].errors;
    if (errors == undefined) {
      return;
    }

    let validator = Object.keys(errors)[0];
    if (validator == 'dateInvalid') {
      return this.verForm.controls[key].errors['msg'];
    } else {
      return this.validation_messages[validator];
    }
  }


}
