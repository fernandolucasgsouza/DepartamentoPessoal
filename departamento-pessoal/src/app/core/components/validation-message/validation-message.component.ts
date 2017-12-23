import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import *  as sc from '../../services'

@Component({
  selector: 'validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {

  @Input() control: FormControl;

  constructor(private service: sc.ValidationService) { }

  get errorMessage(){
    for(let propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) && this.control.touched){
        return sc.ValidationService.
          getValidatorErroMessage(propertyName, this.control.errors[propertyName]);
        }
    }

    return null;
  }
}
