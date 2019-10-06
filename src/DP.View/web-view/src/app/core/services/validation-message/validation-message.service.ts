import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessageService {

  constructor() { }

  static getErroMessage(validatorName: string, validatorValue?: any) {
    let errosConfig = {
      'required': 'Campo não preenchido',
      'email': 'E-mail não é válido',
      'cpf': 'CPF inválido',
      'minlength': `Tamanho mínimo é de ${validatorValue.requiredLength} caracteres`,
      'maxlength': `Tamanho máximo é de ${validatorValue.requiredLength} caracteres`,
      'min': `Quantidade mínima é ${validatorValue.min}`,
      'max': `Quantidade máxima é ${validatorValue.max}`
    }
    return `*${errosConfig[validatorName]}.`;
  }

}
