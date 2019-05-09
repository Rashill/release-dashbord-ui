import { FormGroup } from '@angular/forms';

let label_control_mapping = {
  startDate: 'Dev start date',
  devFinishDate: 'Dev finish date',
  refreshDate: 'Refresh date',
  regressionDeployDate: 'Regression deployment date',
  regressionStartDate: 'Regression start date',
  regressionEndDate: 'Regression end date',
  releaseDate: 'Release date',
  cabDate: 'CAB date'
};

export function DateValidator(s: string) {
  let datesCrls = [
    'startDate',
    'devFinishDate',
    'refreshDate',
    'regressionDeployDate',
    'regressionStartDate',
    'regressionEndDate',
    'releaseDate',
    'cabDate'
  ];

  return (group: FormGroup) => {
    for (let i = 0; i < datesCrls.length - 1; i++) {
      let from = datesCrls[i];
      let to = datesCrls[i + 1];
      let f = group.controls[from];
      let t = group.controls[to];

      // if one of the controls is disabled
      if (f.disabled || t.disabled) {
        f.setErrors(null);
        t.setErrors(null);
        continue;
      }

      // in case if an error already rised
      if (
        (f.errors && !f.errors.dateInvalid) ||
        (t.errors && !t.errors.dateInvalid)
      ) {
        continue;
      }

      // check if from date after to date -> raise an error
      if (f.value >= t.value) {
        let fLabel = label_control_mapping[from];
        let tLabel = label_control_mapping[to];
        f.setErrors({
          dateInvalid: true,
          msg: fLabel + ' should be before ' + tLabel
        });
        t.setErrors({
          dateInvalid: true,
          msg: tLabel + ' should be after ' + fLabel
        });
      } else {
        f.setErrors(null);
        t.setErrors(null);
      }
    }
  };
}
