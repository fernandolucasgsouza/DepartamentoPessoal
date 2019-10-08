import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { SelectComponent } from '../select/select.component';
import { InputComponent } from '../input/input.component';


export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaComponent),
  multi: true
}

@Component({
  selector: 'fs-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACESSOR]
})
export class TextAreaComponent extends InputComponent {

  @Output() onChangeTextArea: EventEmitter<any> = new EventEmitter();
  constructor() {
    super();
  }


  onChanges(v) {
    if (v !== this._currentValue) {
      this.value = v;
      this.onChangeTextArea.emit(this.value);
    }
  }

}
