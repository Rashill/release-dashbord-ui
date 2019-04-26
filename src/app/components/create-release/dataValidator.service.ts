import { FormGroup } from '@angular/forms';

let label_control_mapping = {
'startDate': 'Dev start date', 'devfinish': 'Dev finish date',
'refreshDate': 'Refresh date', 'regressionDeploy': 'Regression deployment date', 
'regressionStart': 'Regression start date', 'regressionEnd': 'Regression end date',
'releaseDate': 'Release date', 'cabDate': 'CAB date'};

export function DateValidator(s: string) {
  let datesCrls = ['startDate', 'devfinish', 'refreshDate', 'regressionDeploy',
    'regressionStart', 'regressionEnd', 'releaseDate', 'cabDate']

  return (group: FormGroup) => {
    for (let i = 0; i < datesCrls.length - 1; i++) {
      let from = datesCrls[i];
      let to = datesCrls[(i + 1)];
      let f = group.controls[from];
      let t = group.controls[to];

      // in case if an error already rised
      if ((f.errors && !f.errors.datInvalid) || (t.errors && !t.errors.datInvalid)) {
        return;
      }

      // check if from date after to date -> raise an error 
      if (f.value > t.value) {
        let fLabel = label_control_mapping[from];
        let tLabel = label_control_mapping[to];
        f.setErrors({ dateInvalid: true, msg: fLabel + ' should be before ' + tLabel});
        t.setErrors({ dateInvalid: true, msg: tLabel + ' should be after ' + fLabel });
      } else {
        f.setErrors(null);
        t.setErrors(null);
      }
    }
  }
}
