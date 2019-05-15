import { Component, OnInit, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReleaseService } from '../../../services/release.service';


@Component({
  selector: 'app-versioning',
  templateUrl: './versioning.component.html',
  styleUrls: ['./versioning.component.scss']
})
export class VersioningComponent implements OnInit {
  release: {
    name: string;
    versioning: {
      sitecore: string;
      SPA: String;
      biztalkWCF: string;
    };
  };

  csv: string;
  submitting: boolean;

  //either create or update
  mode: string = 'Create';
  releaseId: string;
  verForm: FormGroup;


  validation_messages = {
    required: 'This is required field',
    dateInvalid: 'Date invalid',
    email: 'Invalid email format',
    csv: 'Invalid CSV format'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private releaseService: ReleaseService
  ) {}

  ngOnInit() {
    this.releaseId = this.route.snapshot.paramMap.get('id');

    this.release = {
      name: '',
      versioning: {
        sitecore: '',
        SPA: '',
        biztalkWCF: ''
      }
    };

    this.csv = '';
    this.submitting = false;

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
            Validators.required
          ]),
          SPA: new FormControl(this.release.versioning.SPA, [
            Validators.required
          ]),
          biztalkWCF: new FormControl(this.release.versioning.biztalkWCF, [
            Validators.required
          ]),
          csv: new FormControl(this.csv, [
            //  Validators.required,
              CSVValidator.csv
          ])
        }
      );
      //end of form gorup init.


      this.verForm.controls['csv'].valueChanges.subscribe(value => {
        if (value.length == 0) {
          this.verForm.controls['sitecore'].enable();
          this.verForm.controls['SPA'].enable();
          this.verForm.controls['biztalkWCF'].enable();
        } else {
          this.verForm.controls['sitecore'].disable();
          this.verForm.controls['SPA'].disable();
          this.verForm.controls['biztalkWCF'].disable();
          this.updateFromCSV();
        }
        this.verForm.updateValueAndValidity();
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
            if(res[0].versioning != undefined){
              this.release.versioning = res[0].versioning;
            }
            this.release.name = res[0]['projects'][0]['versionDetails']['name'];
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
      this.submitting = true;
      this.releaseService
        .editRelease(this.releaseId, {"versioning": this.release.versioning})
        .pipe(
          map(res => res) // or any other operator
        )
        .subscribe(
          res => {
            this.submitting = false;
            this.router.navigate(['/release/' + this.releaseId]);
          },
          error => {
            this.submitting = false;
            return throwError(error); // Angular 5/RxJS 5.5
          }
        );
  }


  updateFromCSV(){
    var cells = this.csv.split(",");
    this.release.versioning.sitecore = cells[0];
    this.release.versioning.SPA = cells[1];
    this.release.versioning.biztalkWCF = cells[2];
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

  
  /**
   * Export to CSV function ()
   * It deals with json data
   */
  exportToCSV() {
    const rows = this.release.versioning;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let dataString = '';
    const x: any[] = [];
    const keys = Object.keys(this.release.versioning);
    keys.forEach((key, index) => {
      x.push(this.release.versioning[key]);
    });

    csvContent += keys + '\n';
    csvContent += x.join(',');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.release.name +'-versioning.csv');

    link.click();
  }

}


export class CSVValidator{
  static csv(control: AbstractControl) {
    let val = control.value;
    var cells = val.split(",");
    if(cells.length  !== 3 && val.length!==0){
      return {'csv': true};
    }
    return null;
  }
}
