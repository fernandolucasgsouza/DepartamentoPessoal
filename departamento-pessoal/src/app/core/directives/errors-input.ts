import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';

declare var $: any;

@Directive({
  selector: '[errors-input]'
})

export class ErrorsInputDirective implements AfterViewInit {
  @Input() control: FormControl;
  @Input() minLength: string;
  @Input() maxLength: string;

  public errors: Array<any>;

  constructor(private _elRef: ElementRef) {
   
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
        message: 'Tamanho máximo é de ' + this.maxLength + ' caracteres'
      },
      {
        name: 'minLength',
        message: '"Tamanho minimo é de ' + this.minLength + ' caracteres'
      },
    ]
  }

  ngAfterViewInit(): void {

  }

  ngOnChanges(changes) {
    if ('maxLength' in changes) {
      this.errors.forEach((element) => {
        if (element.name == "maxLength") {
          element.message = "Tamanho máximo é de " + this.maxLength + " caracteres"
        }
      });
    }

    if ('minLength' in changes) {
      this.errors.forEach((element) => {
        if (element.name == "minLength") {
          element.message = "Tamanho minimo é de " + this.minLength + " caracteres"
        }
      });
    }


  }

  public getError() {
    for (let key in this.control.errors) {
      return this.control.touched;
    }
    return false;
  }

  public getErrorControl(name) {
    for (let key in this.control.errors) {
      if (key == name) {
        return this.control.touched;
      }
      return false;
    }
  }
}
