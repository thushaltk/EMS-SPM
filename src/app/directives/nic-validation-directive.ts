import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createNicInvalidValidator } from "../validators/nic-invalid-validator";

@Directive({
  selector: "[nicValidation]",
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:NicValidationDirective,
    multi: true
  }]
})
export class NicValidationDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors {
    return createNicInvalidValidator()(control);
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }



}
