import { Component, OnInit, Input, forwardRef, Output, EventEmitter, OnChanges } from '@angular/core';

import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

export const CUSTOM_SELECT_CONTROL_VALUE_ACESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
}

@Component({
  selector: 'fs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACESSOR]
})

/**
 * @exemple html
 *  <fs-select
      label="Nomes"
      id="nomes"
      helper="Nomes de dependentes"
      [items]="datas"
      formControlName="nomes"
      [control]="form.get('nomes')"
      isReadOnly="false"
      (onChangeSelect)="changeSelect($event)"
      >
    </fs-select>

    * @exemple ts setar o valor Init
    ngOnInit() {
      this.setName()
    }

    setName() {
      const nome = { code: 2, description: 'Lucas', sigla: 'LU' }
      this.form.get('nomes').setValue(nome);
    }
 */
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() label: string;
  @Input() helper: string;
  @Input() id: string;
  @Input() items: Array<CodeDescriptionModel>;
  @Input() isReadOnly = false;
  @Input() control: FormControl;

  @Output() onChangeSelect: EventEmitter<any> = new EventEmitter();

  private _currentValue: any;

  get value() {
    return this._currentValue;
  }

  set value(v: any) {
    if (v !== this._currentValue) {
      this._currentValue = v;
      this.onChangeCB(v);
    }
  }

  constructor() { }

  ngOnInit() { }

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
    console.log(isDisabled);

    this.isReadOnly = isDisabled;
  }

  compareItems(obj1: CodeDescriptionModel, obj2: CodeDescriptionModel) {
    return obj1 && obj2 ? (obj1.code === obj2.code) : obj1 === obj2;
  }

  onChanges(v) {
    if (v !== this._currentValue) {
      this.value = v;
      this.onChangeSelect.emit(this.value);
    }
  }
}
