import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createNicInvalidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    if (value.endsWith("V") && value.length == 10) {
      return null;
    } else {
      return { nicInvalid: true };
    }
  }
}
