import { Directive, ElementRef, Input, AfterViewInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

declare var $: any;

@Directive({
  selector: '[mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaskDirective),
      multi: true,
    }
  ]
})
export class MaskDirective implements AfterViewInit, ControlValueAccessor, Validator {

  @Input('mask') mask: string;
  @Input() maskReverse: string = 'false';

  public onChange = (_: any) => { };
  public onTouched = (_: any) => { };

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    $(this.elRef.nativeElement).mask(
      this.mask, {
        reverse: (this.maskReverse == 'true') ? true : false,
        onKeyPress: (cep, event, currentField, options) => {
          this.onChange(cep);
        }
      });
  }


  writeValue(obj: any): void {
    this.elRef.nativeElement.value = obj;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.elRef.nativeElement.setAttribute('disabled', true);
    } else {
      this.elRef.nativeElement.removeAttribute('disabled');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: FormControl) {
    return c.errors;
  }
}
