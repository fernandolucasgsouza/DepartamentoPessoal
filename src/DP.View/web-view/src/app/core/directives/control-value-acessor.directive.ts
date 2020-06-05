import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { forwardRef, Input, Output, EventEmitter, Directive, OnInit } from '@angular/core';
import { MaskProvider } from '../providers/mask.providers';



// tslint:disable-next-line:class-name
class CUSTOM_CONTROL_ACCESS {
  static Values(component) {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => component),
      multi: true

    };
  }
}

@Directive()
export class ControlValueAcessorDirective implements OnInit {
  @Input() label: any;
  @Input() sigla: string;
  @Input() helper: string;
  @Input() classCss: string;
  @Input() id: string;
  @Input() type = 'text';

  @Input() mask: MaskProvider;
  @Input() placeholder: string;
  @Input() isReadOnly = false;
  @Input() control: FormControl;

  @Output() changeField: EventEmitter<any> = new EventEmitter();

  protected currentValue: any;

  get value() {
    return this.currentValue;
  }

  set value(v: any) {
    if (v !== this.currentValue) {
      this.control.markAsTouched();
      this.currentValue = v;
      this.onChangeCB(v);
    }
  }

  constructor() {
    this.currentValue = '';
  }

  public ngOnInit() {
    if (this.label) {
      this.label = this.word(this.label, 'label');
    } else if (this.sigla) { this.sigla = this.word(this.sigla, 'sigla'); }
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

  onChanges(v?: any) {
    this.value = v;
    if (!!this.currentValue) {
      this.changeField.emit(this.currentValue);
    }
  }

  word(word: string, type: 'label' | 'sigla') {
    if (type === 'sigla') {
      const upAll = sgl => sgl.toLocaleUpperCase();
      return upAll(word);
    } else if (type === 'label') {
      const firstLetterUp = lbl => lbl.charAt(0).toLocaleUpperCase().concat(lbl.substr(1).toLocaleLowerCase());
      return firstLetterUp(word);
    }
  }

}