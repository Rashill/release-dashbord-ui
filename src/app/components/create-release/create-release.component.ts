import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'ngbd-create-release',
  templateUrl: './create-release.component.html',
  styleUrls: ['./create-release.component.scss']
})
export class CreateReleaseComponent implements OnInit {
  type = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];
  release: {
    releasename: string,
    type:String,
    description:string,
    releasedate:string,
    devstart:string,
    devfinish:string,
    refreshDate:string,
    regressionDeploy:string,
    regressionStart:string,
    regressionEnd:string,
    testenvironment:string,
    cabDate:String,
    regenvironment:string,
    sitecore:string,
    biztalk:string,
    devsupport:string
  };

  createForm: FormGroup;

  error: Boolean;

  constructor() { }

  ngOnInit() {
    this.error = false;

    this.release = {
      releasename: '',
      type: '',
      description:'',
      releasedate:'',
      devstart:'',
      devfinish:'',
      refreshDate:'',
      regressionDeploy:'',
      regressionStart:'',
      regressionEnd:'',
      testenvironment:'',
      cabDate:'',
      regenvironment:'',
      sitecore:'',
      biztalk:'',
      devsupport:''
    };

    this.createForm = new FormGroup({
      releasename: new FormControl(this.release.releasename, [
        Validators.required
      ]),
      description: new FormControl(this.release.description, [
        Validators.required
      ]),
      type: new FormControl(this.release.type, [
        Validators.required
      ]),
      releasedate: new FormControl(this.release.releasedate, [
        Validators.required
      ]),
      devstart: new FormControl(this.release.devstart, [
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

}
