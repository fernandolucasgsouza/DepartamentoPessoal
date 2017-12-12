import { Injectable } from '@angular/core';

@Injectable()
export class FeriasService {

  constructor() { }

  public calculaSalarioBruto(salario: number, horasExtras: number): number {
    let result = salario + horasExtras;
    return result;
  }

}
