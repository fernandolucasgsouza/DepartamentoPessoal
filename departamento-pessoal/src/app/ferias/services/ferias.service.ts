import { Injectable } from '@angular/core';

import * as cec from '../../core/constants';


@Injectable()
export class FeriasService {

  public result: number;
  public faixa1;
  public faixa2;
  public faixa3;


  constructor() {

    this.faixa1 = cec.Inss.FAIXA_1;
    this.faixa2 = cec.Inss.FAIXA_2;
    this.faixa3 = cec.Inss.FAIXA_3;

    console.log(this.faixa1);
    console.log(this.faixa2);
    console.log(this.faixa3);
  }


  public calculaFerias(salario, horasExtras: number, dias: number): number {
    let valorBruto: number;
    valorBruto = salario + horasExtras;
    this.result = (valorBruto / 30) * dias;
    this.result.toFixed(2);
    return this.result;
  }

  public calculaFerias1_3(valorBruto: number): number {
    let result: number;
    result = valorBruto / 3;
    result.toFixed(2);
    return result;
  }

  public calculaInss(salarioBruto: number): number {

    let result: number;
    if (salarioBruto <= this.faixa1.MAX) {
      result = salarioBruto * this.faixa1.PERCENT;
      return result;
    }
    if (salarioBruto > this.faixa1.MAX && salarioBruto < this.faixa2.MAX) {
      result = salarioBruto * this.faixa2.PERCENT;
      return result;
    }

    console.log(result);
  }

}
