import { Injectable } from '@angular/core';

import * as cec from '../../core/constants';
import * as sc from '../../core/services';
import * as pc from '../../core/pipes';
import { CalculaPercentualPipe } from '../../core/pipes';


@Injectable()
export class FeriasService {

  public result: number;
  public percentual_INSS: number;
  public percentual_IRRF: number;

  constructor(private calcPercent: pc.CalculaPercentualPipe) {

    console.log(cec.Inss.FAIXA_1);
    console.log(cec.Inss.FAIXA_2);
    console.log(cec.Inss.FAIXA_3);

    console.log(cec.Irrf.FAIXA_1);
    console.log(cec.Irrf.FAIXA_2);
    console.log(cec.Irrf.FAIXA_3);
    console.log(cec.Irrf.FAIXA_4);
    console.log(cec.Irrf.FAIXA_5);

  }

  public calculaFerias(salario, horasExtras: number, diasFerias: number): number {
    let diaria: number = 0;
    diaria = (salario + horasExtras) / 30;
    return diasFerias * diaria;
  }

  public calculaFerias1_3(valorBruto: number): number {
    return valorBruto / 3;
  }

  public calculaINSS(salarioFerias: number, salario1_3: number): number {
    let result: number = 0;
    let salarioBruto: number = 0;
    let FX1 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_1.MAX));
    let FX2 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_2.MAX));
    let FX3 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX));

    salarioBruto = salarioFerias + salario1_3;

    if (salarioBruto <= FX1) {
      this.percentual_INSS = cec.Inss.FAIXA_1.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_1.PERCENT)
      return result;
    }
    if (salarioBruto > FX1 && salarioBruto <= FX2) {
      this.percentual_INSS = cec.Inss.FAIXA_2.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_2.PERCENT);
      return result;
    }
    if (salarioBruto > FX2 && salarioBruto <= FX3) {
      this.percentual_INSS = cec.Inss.FAIXA_3.PERCENT;
      result = this.calcPercent.transform(salarioBruto, cec.Inss.FAIXA_3.PERCENT)
      return result;
    } else {
      let teto = parseFloat(sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX))
      this.percentual_INSS = cec.Inss.FAIXA_3.PERCENT;
      result = this.calcPercent.transform(teto, cec.Inss.FAIXA_3.PERCENT)
      return result;
    }
  }

  calculaIRRF(vrFerias: number, vr1_3: number, vrInss: number, numDependentes: number) {
    let valorBase: number = 0;
    let vrDependentes: number = 0;
    let FX1 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_1.MAX));
    let FX2 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_2.MAX));
    let FX3 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_3.MAX));
    let FX4 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_4.MAX));
    let FX5 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_5.ACIMA));

    let DED_FX2 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_2.DEDUCAO));
    let DED_FX3 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_3.DEDUCAO));
    let DED_FX4 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_4.DEDUCAO));
    let DED_FX5 = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_5.DEDUCAO));

    let VR_DEP = parseFloat(sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_DEPENDENTE.VALOR));

    vrDependentes = numDependentes * VR_DEP;
    valorBase = (vrFerias + vr1_3) - (vrInss + vrDependentes);

    if (valorBase <= FX1) {
      this.percentual_IRRF = cec.Irrf.FAIXA_1.PERCENT;
      return 0;
    }
    if (valorBase > FX1 && valorBase <= FX2) {
      return this._calculoIRRF(cec.Irrf.FAIXA_2.PERCENT, valorBase, DED_FX2);
    }
    if (valorBase > FX2 && valorBase <= FX3) {
      return this._calculoIRRF(cec.Irrf.FAIXA_3.PERCENT, valorBase, DED_FX3);
    }
    if (valorBase > FX3 && valorBase <= FX4) {
      return this._calculoIRRF(cec.Irrf.FAIXA_4.PERCENT, valorBase, DED_FX4);

    }
    if (valorBase > FX5) {
      return this._calculoIRRF(cec.Irrf.FAIXA_5.PERCENT, valorBase, DED_FX5);

    }
    if (valorBase > FX1 && valorBase <= FX2) {
      return this._calculoIRRF(cec.Irrf.FAIXA_2.PERCENT, valorBase, DED_FX2);
    }
  }

  private _calculoIRRF(percentual, valBase, deducao) {
    this.percentual_IRRF = percentual;
    let calc = this.calcPercent.transform(valBase, percentual);
    return calc - deducao;
  }

  public somaSubtotal(val_A: any, val_B: any) {
    (val_A == '-' ? 0 : val_A);
    (val_B == '-' ? 0 : val_B);
    return val_A + val_B;
  }

  public calcTotal(val_A: any, val_B: any) {
    (val_A == '-' ? 0 : val_A);
    (val_B == '-' ? 0 : val_B);
    return val_A - val_B;
  }

}
