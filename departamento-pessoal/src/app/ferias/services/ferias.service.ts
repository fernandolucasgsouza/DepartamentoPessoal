import { Injectable } from '@angular/core';

import * as cec from '../../core/constants';


@Injectable()
export class FeriasService {

  public result: number;
  public faixa1;
  public faixa2;
  public faixa3;


  constructor() {

    this.faixa1  = cec.Inss.FAIXA_1;
    this.faixa2  = cec.Inss.FAIXA_2;
    this.faixa3  = cec.Inss.FAIXA_3;

    console.log(this.faixa1);
    console.log(this.faixa2);
    console.log(this.faixa3);
   }


  public calculaFerias(salario: number, horasExtras: number, dias:number): number {
    let valorBruto = salario + horasExtras;
    this.result = (valorBruto / 30) * dias;
    return this.result;
  }

  public calcularFerias1_3(valorBruto:number):number{
    return valorBruto / 3;
  }

}
