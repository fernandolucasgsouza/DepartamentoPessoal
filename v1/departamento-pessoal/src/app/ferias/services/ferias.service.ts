import { Injectable } from '@angular/core';

import * as cec from '../../core/constants';
import * as sc from '../../core/services';
import * as pc from '../../core/pipes';
import { CalculaPercentualPipe } from '../../core/pipes';


@Injectable()
export class FeriasService {

  public percentual_INSS: number = 0;
  public percentual_IRRF: number = 0;

  constructor(private calcPercent: pc.CalculaPercentualPipe) { }

  public calculaFerias(salario: number = 0, horasExtras: number = 0, diasFerias: number = 0): number {
    let diaria: number = 0;
    diaria = (salario + horasExtras) / 30;
    return diasFerias * diaria;
  }

  public calculaFerias1_3(valorBruto: number = 0): number {
    return valorBruto / 3;
  }

  public calculaINSS(salarioFerias: number = 0, salario1_3: number = 0): number {
    let result: number = 0;
    let salarioBruto: number = 0;
    let FX1 = sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_1.MAX);
    let FX2 = sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_2.MAX);
    let FX3 = sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX);

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
      let teto = sc.FormatDatasService.formatForFloat(cec.Inss.FAIXA_3.MAX)
      this.percentual_INSS = cec.Inss.FAIXA_3.PERCENT;
      result = this.calcPercent.transform(teto, cec.Inss.FAIXA_3.PERCENT)
      return result;
    }
  }

  calculaIRRF(vrFerias: number = 0, vr1_3: number = 0, vrInss: number = 0, numDependentes: number = 0) {
    let valorBase: number = 0;
    let vrDependentes: number = 0;
    let FX1 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_1.MAX);
    let FX2 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_2.MAX);
    let FX3 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_3.MAX);
    let FX4 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_4.MAX);
    let FX5 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_5.ACIMA);

    let DED_FX2 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_2.DEDUCAO);
    let DED_FX3 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_3.DEDUCAO);
    let DED_FX4 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_4.DEDUCAO);
    let DED_FX5 = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_5.DEDUCAO);

    let VR_DEP = sc.FormatDatasService.formatForFloat(cec.Irrf.FAIXA_DEPENDENTE.VALOR);
    debugger
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
  }

  public verificaFaltas(falta: number = 0) {

    let FX1 = cec.Faltas.FAIXA_1.MAX;
    let FX2 = cec.Faltas.FAIXA_2.MAX;
    let FX3 = cec.Faltas.FAIXA_3.MAX;
    let FX4 = cec.Faltas.FAIXA_4.MAX;
    let FX5 = cec.Faltas.FAIXA_5.ACIMA;

    if (falta <= FX1) {
      return cec.Faltas.FAIXA_1.DIREITO;
    }
    else if (falta > FX1 && falta <= FX2) {
      return cec.Faltas.FAIXA_2.DIREITO;
    }
    else if (falta > FX2 && falta <= FX3) {
      return cec.Faltas.FAIXA_3.DIREITO;
    }
    else if (falta > FX3 && falta <= FX4) {
      return cec.Faltas.FAIXA_4.DIREITO;
    }
    else {
      return cec.Faltas.FAIXA_5.DIREITO;
    }

  }

  private _calculoIRRF(percentual, valBase, deducao) {
    this.percentual_IRRF = percentual;
    let calc = this.calcPercent.transform(valBase, percentual);
    return calc - deducao;
  }

  public somaSubtotal(val_A: any, val_B: any) {
    (val_A == null || val_A == undefined ? 0 : val_A);
    (val_B == null || val_B == undefined ? 0 : val_B);
    return val_A + val_B;
  }

  public calcTotal(val_A: any, val_B: any) {
    (val_A == null || val_A == undefined ? 0 : val_A);
    (val_B == null || val_B == undefined ? 0 : val_B);
    return val_A - val_B;
  }
}
