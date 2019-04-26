import { FormGroup } from '@angular/forms';

export function DateValidator(s: string) {
  let datesCrls = ['startDate', 'devfinish', 'refreshDate',
    'regressionStart', 'regressionEnd', 'cabDate', 'releaseDate']

  return (group: FormGroup) => {
    for (let i = 0; i < datesCrls.length - 1; i++) {
      let from = datesCrls[i];
      let to = datesCrls[(i + 1)];
      let f = group.controls[from];
      let t = group.controls[to];

      // in case if an error already rised
      if (t.errors && !t.errors.datInvalid) {
        return;
      }

      // check if from date after to date -> raise an error 
      if (f.value > t.value) {
        t.setErrors({ dateInvalid: true });
      } else {
        t.setErrors(null);
      }
    }
  }
}
