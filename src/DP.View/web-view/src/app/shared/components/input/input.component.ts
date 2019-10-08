import { Component, OnInit, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export const CUSTOM_INPUT_CONTROL_ACESS_VALUE: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
}

/**
 * @example html
  <fs-input
    label="Salário"
    id="salario"
    formControlName="salario"
    [control]="form.get('salario')"
    mask="dot_separator.2"
    placeholder="0,00"
  >
  </fs-input>
 *
 */
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


  @Output() onChangeInput: EventEmitter<any> = new EventEmitter();

  protected _currentValue: any;

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

  protected onChangeCB: (_: any) => void = () => { };
  protected onTouchedCB: (_: any) => void = () => { };

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

  onChanges(v) {
    if (v !== this._currentValue) {
      this.value = v;
      this.onChangeInput.emit(this.value);
    }
  }

}
