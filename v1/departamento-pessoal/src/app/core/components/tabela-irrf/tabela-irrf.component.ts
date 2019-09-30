import { Component, OnInit } from '@angular/core';

import * as ctc from '../../constants/irrf'

@Component({
  selector: 'fs-tabela-irrf',
  templateUrl: './tabela-irrf.component.html',
  styleUrls: ['./tabela-irrf.component.css']
})
export class TabelaIrrfComponent implements OnInit {

  public listConfig: any = [];
  public listDatas: any[][];
  public vrDependente:string;
  private irrf: ctc.Irrf;

  constructor(
  ) { 
    this.vrDependente = ctc.Irrf.FAIXA_DEPENDENTE.VALOR;
  }

  ngOnInit() {
    this.createTable();
  }

  public createTable() {
    this.listConfig = [
      { aling: 'text-left', width: '' },
      { aling: 'text-center', width: '' },
      { aling: 'text-right', width: '' }]

     this.listDatas = [
      [`Base cálculo mensal`, `Aliquota`, `Parcela a deduzir do imposto`],
      [`Até R$${ctc.Irrf.FAIXA_1.MAX}`, `${ctc.Irrf.FAIXA_1.PERCENT}%`,  `-`],
      [`De R$${ctc.Irrf.FAIXA_2.MIN} até R$${ctc.Irrf.FAIXA_2.MAX}`, `${ctc.Irrf.FAIXA_2.PERCENT}%`,`R$${ctc.Irrf.FAIXA_2.DEDUCAO}`],
      [`De R$${ctc.Irrf.FAIXA_3.MIN} até R$${ctc.Irrf.FAIXA_3.MAX}`, `${ctc.Irrf.FAIXA_3.PERCENT}%`,`R$${ctc.Irrf.FAIXA_3.DEDUCAO}`],
      [`De R$${ctc.Irrf.FAIXA_4.MIN} até R$${ctc.Irrf.FAIXA_4.MAX}`, `${ctc.Irrf.FAIXA_4.PERCENT}%`,`R$${ctc.Irrf.FAIXA_4.DEDUCAO}`],
      [`Acima de R$${ctc.Irrf.FAIXA_5.ACIMA}`, `${ctc.Irrf.FAIXA_5.PERCENT}%`,`R$${ctc.Irrf.FAIXA_5.DEDUCAO}`],
    ]
  }


}
