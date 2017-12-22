import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  static getValidatorErroMessage(validatorName: string, validatorValue?: any) {
    let errorsConfig =
      {
        'required'  : 'Campo não preenchido.',
        'email'     : 'E-mail não é válido.',
        'cpf'       : 'CPF inválido',
        'minlength' : `Tamanho mínimo é de ${validatorValue.requiredLength} caracteres`,
        'maxlength' : `Tamanho máximo é de ${validatorValue.requiredLength} caracteres`
      }

      return errorsConfig[validatorName];
  }

}
