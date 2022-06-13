import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const notSameMonthValidator: ValidatorFn = (control:
    AbstractControl): ValidationErrors | null => {
    const monthFrom = control?.get('monthFrom')?.value;
    const monthTo = control?.get('monthTo')?.value;
    if (monthFrom && monthTo && monthFrom != monthTo) {
      return { 'notSameMonthValidator': true };
    } else
      return null;
};

export const invalidInitialDateValidator: ValidatorFn = (control:
    AbstractControl): ValidationErrors | null => {
    return invalidDate(control, 'monthFrom', 'dayFrom', 'invalidInitialDateValidator');
};

export const invalidFinalDateValidator: ValidatorFn = (control:
    AbstractControl): ValidationErrors | null => {
    return invalidDate(control, 'monthTo', 'dayTo', 'invalidFinalDateValidator');
};

function invalidDate(control: AbstractControl, monthControl: string,
    dayString: string, validatorString: string) {
    const month = control?.get(monthControl)?.value;
    const day = control?.get(dayString)?.value;
    if (month && day) {
        let date1 = new Date(2020, month - 1, 1);
        let date2 = new Date(2020, month - 1, 1);
        date2.setDate(day);

        if (date1.getMonth() != date2.getMonth()) {
            let o: any = {};
            o[validatorString] = true;
            return o;
        }
    }
    return null;
}