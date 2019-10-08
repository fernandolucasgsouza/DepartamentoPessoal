import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_ACESS_VALUE: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
}

@Component({
  selector: 'fs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_ACESS_VALUE]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() helper: string;
  @Input() classCss: string;
  @Input() id: string;
  @Input() type = 'text';
  @Input() mask: any;
  @Input() placeholder: string;
  @Input() isReadOnly = false;
  @Input() control: FormControl;

  private _currentValue: any;

  get value() {
    return this._currentValue;
  }

  set value(v: any) {

    if (v !== this._currentValue) {
      this.control.markAsTouched();
      this._currentValue = v;
      this.onChangeCB(v);
    }
  }

  constructor() {
    this._currentValue = '';
  }

  ngOnInit() {
  }

  onChangeCB: (_: any) => void = () => { };
  onTouchedCB: (_: any) => void = () => { };

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCB = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCB = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
