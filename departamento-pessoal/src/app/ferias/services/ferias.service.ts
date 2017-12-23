import { Injectable } from '@angular/core';

import * as cec from '../../core/constants';
import * as sc from '../../core/services';
import * as pc from '../../core/pipes';
import { CalculaPercentualPipe } from '../../core/pipes';


@Injectable()
export class FeriasService {

  public result: number;
  public percentual: number;

  constructor(private calcPercent: pc.CalculaPercentualPipe) {

    console.log(cec.Inss.FAIXA_1);
    console.log(cec.Inss.FAIXA_2);
    console.log(cec.Inss.FAIXA_3);
  }


  public calculaFerias(salario, horasExtras: number, dias: number): number {
    let valorBruto = salario + horasExtras;
    this.result = (valorBruto / 30) * dias;
    return this.result;
  }

  public calculaFerias1_3(valorBruto: number): number {
    return valorBruto / 3;
  }

  public calculaInss(salarioBruto: number): number {
    let result: number;
    let FX1 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_1.MAX));
    let FX2 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_2.MAX));
    let FX3 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX));

    if (salarioBruto <= FX1) {
      this.percentual = cec.Inss.FAIXA_1.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_1.PERCENT)
      return result;
    }
    if (salarioBruto > FX1 && salarioBruto <= FX2) {
      this.percentual = cec.Inss.FAIXA_2.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_2.PERCENT);
      return result;
    }
    if (salarioBruto > FX2 && salarioBruto <= FX3) {
      this.percentual = cec.Inss.FAIXA_3.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_3.PERCENT)
      return result;
    } else {
      let teto = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX))
      this.percentual = cec.Inss.FAIXA_3.PERCENT;
      result = this.calcPercent.transform(teto, cec.Inss.FAIXA_3.PERCENT)
      return result;
    }

  }

}
