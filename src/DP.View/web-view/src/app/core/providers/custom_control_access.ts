import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';


// tslint:disable-next-line:class-name
export class CUSTOM_CONTROL_ACCESS {
  static Values(component) {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => component),
      multi: true
    };
  }
}
