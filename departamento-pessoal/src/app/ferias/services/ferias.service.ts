import { Injectable } from '@angular/core';

@Injectable()
export class FeriasService {

  public result: number;

  constructor() { }

  public calculaFerias(salario: number, horasExtras: number, dias:number): number {
    let valorBruto = salario + horasExtras;
    this.result = (valorBruto / 30) * dias;
    return this.result;
  }

  public calcularFerias1_3(valorBruto:number):number{
    return valorBruto / 3;
  }

}
