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

  @Input() control: FormControl;
  @Input() minlength: string;
  @Input() maxlength: string;

  public errors: Array<any>;
  public onTouched:any;
  public onChange:any;

  constructor(private elRef: ElementRef) {
    this.errors = [
      {
        name: 'required',
        message: 'Campo não preenchido.'
      },
      {
        name: 'email',
        message: 'E-mail não é válido.'
      },
      {
        name: 'cpf',
        message: 'CPF inválido'
      },
      {
        name: 'maxLength',
        message: 'Tamanho máximo é de ' + this.maxlength + ' caracteres'
      },
      {
        name: 'minLength',
        message: '"Tamanho minimo é de ' + this.minlength + ' caracteres'
      },
    ]
  }

  @HostListener('keyup', ['$event'])
  keyEvent($event: any) {
    let valor = $event.target.value;
    console.log('valor',valor);

    console.log(this.getError(), this.control.valid);
  }

  public getError() {
    for (let key in this.control.errors) {
      return this.control.touched;
    }
    return false;
  }

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
