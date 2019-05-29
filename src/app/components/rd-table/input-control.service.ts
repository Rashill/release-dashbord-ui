/**
 * Adapted from Google Inc, see the details below:
 * Copyright 2017-2018 Google Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at http://angular.io/license
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Injectable()
export class InputControlService {

  private messages = [];
  constructor() {
    this.initMessages();
  }


  createFormGroup(record: {}, fields: any[]) {
    let group: any = {};
    fields.forEach(attr => {  
      let validators = [];
      if (attr['required']){
         validators.push(Validators.required);
      } 
       
      let validator = attr['validator'] ? attr['validator'].split('(')[0] : '';
      switch (validator) {
        case 'required': {
          validators.push(Validators.required);
          break;
        } case 'requiredTrue': {
          validators.push(Validators.requiredTrue);
          break;
        } case 'min': {
          let parm = (attr['validator'].split('(')[1]).split(')')[0];
          validators.push(Validators.min(parm));
          validators.push(NumbericValidator.numeric);
          break;
        } case 'max': {
          let parm = (attr['validator'].split('(')[1]).split(')')[0];
          validators.push(Validators.max(parm));
          validators.push(NumbericValidator.numeric);
          break;
        } case 'minLength': {
          let parm = (attr['validator'].split('(')[1]).split(')')[0];
          validators.push(Validators.minLength(parm));
          break;
        } case 'maxLength': {
          let parm = (attr['validator'].split('(')[1]).split(')')[0];
          validators.push(Validators.maxLength(parm));
          break;
        } case 'email': {
          validators.push(Validators.email);
          break;
        } case 'pattern': {
          let parm = (attr['validator'].split('(')[1]).split(')')[0];
          validators.push(Validators.pattern(parm));
          break;
        } case 'number': {
          validators.push(NumbericValidator.numeric);
          break;
        } default: { // no validation
          break;
        }
      }
      //add the validators and create a form control
      group[attr['key']] = new FormControl(record[attr['key']] || '', validators);

    });
    return new FormGroup(group);
  }

  initMessages() {
    this.setMessage('required', 'This is required field');
    this.setMessage('requiredTrue', 'Please check this box to proceed');
    this.setMessage('min', 'Invalid value ');
    this.setMessage('max', 'Invalid value ');
    this.setMessage('email', 'Invalid email format');
    this.setMessage('minLength', 'Minimum length ');
    this.setMessage('maxLength', 'Maximum length ');
    this.setMessage('pattern', 'Invalid input format');
    this.setMessage('number', 'Invalid number: numeric value only');
  }

  setMessage(validatorName, message) {
    this.messages[validatorName] = message;
  }

  getMessage(validatorName) {
    return this.messages[validatorName];
  }

  getMessageFromError(error){
    try{
      let validator = Object.keys(error)[0];
      let details = JSON.stringify(error[validator]);
      return this.getMessage(validator) + " " + (details != 'true' ? details : "");
    }catch(e){
      return 'Invalid input';
    }
  }

}

/**
 * Adapted from 
 * https://stackoverflow.com/questions/45057907/input-type-number-only-numeric-value-validation
 */
export class NumbericValidator{
  // Number only validation
  static numeric(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'number': true };
    return null;
  }
}