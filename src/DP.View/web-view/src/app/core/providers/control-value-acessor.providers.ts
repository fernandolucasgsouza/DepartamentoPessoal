import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms'
import { forwardRef, Input, Output, EventEmitter } from '@angular/core'



export class CUSTOM_CONTROL_ACESS {
  static Values(component) {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => component),
      multi: true

    }
  }
}

export class ControlValueAcessorProvider {

  @Input() label: any;
  @Input() sigla: string;
  @Input() helper: string;
  @Input() classCss: string;
  @Input() id: string;
  @Input() type = 'text';

  @Input() placeholder: string;
  @Input() isReadOnly = false;
  @Input() control: FormControl;


  @Output() onChangeField: EventEmitter<any> = new EventEmitter();

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
    if (this.label) this.label = this.word(this.label, 'label');
    else if (this.sigla) this.sigla = this.word(this.sigla, 'sigla');
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

  onChanges() {

    if (!!this._currentValue) {
      this.onChangeField.emit(this._currentValue);
    }
  }

  word(word: string, type: 'label' | 'sigla') {
    if (type === 'sigla') {
      const upAll = sgl => sgl.toLocaleUpperCase();
      return upAll(word);
    } else if (type === 'label') {
      const firstLetterUp = lbl => lbl.charAt(0).toLocaleUpperCase().concat(lbl.substr(1).toLocaleLowerCase());
      return firstLetterUp(word)
    }
  }

}