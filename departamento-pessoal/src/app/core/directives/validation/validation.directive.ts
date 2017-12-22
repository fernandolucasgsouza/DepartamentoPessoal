import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Directive({
  selector: '[validation]',
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting:ValidationDirective,
    multi:true
  }]
})
export class ValidationDirective implements ControlValueAccessor {

  public onTouched:any;
  public onChange:any;

  constructor(private elRef: ElementRef) {}


  @HostListener('keyup', ['$event'])
  keyEvent($event: any) {
    let valor = $event.target.value;
    console.log('valor',valor);
  };

  /**
   * Obtem o valor contido na model
   * @param obj any
   */
  writeValue(obj: any): void {
    this.elRef.nativeElement.value;
  }

  /**
   * Registra a função a ser chamada para atualizar valor na model
   * @param fn any
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra a função a ser chamada para atualizar valor na model para evento touched
   * @param fn
   */
  registerOnTouched(fn: any): void {
   this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }


}
