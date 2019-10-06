import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ValidationMessageService } from 'src/app/core/services/validation-message/validation-message.service';

@Component({
  selector: 'fs-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {

  @Input() control: FormControl;

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched)
        return ValidationMessageService.getErroMessage(propertyName, this.control.errors[propertyName]);
    }
    return null;
  }

  errorMessageAll(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.errorMessageAll(control);
      }
    });
  }

}
