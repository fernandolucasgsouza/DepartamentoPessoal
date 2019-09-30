import { Component, OnInit, Input } from '@angular/core';

import * as ctc from '../../constants/inss'

@Component({
  selector: 'fs-tabela-inss',
  templateUrl: './tabela-inss.component.html',
  styleUrls: ['./tabela-inss.component.css']
})
export class TabelaInssComponent implements OnInit {

  public listConfig: any = []
  public listDatas: any[][]
  private inss: ctc.Inss

  constructor(
  ) { }

  ngOnInit() {
    this.createTable();
  }

  public createTable() {
    this.listConfig = [
      { aling: 'text-left', width: '' },
      { aling: 'text-right', width: '' }]

     this.listDatas = [
      [`Descrição`, `Percentual`],
      [`Salário até R$${ctc.Inss.FAIXA_1.MAX}`, `${ctc.Inss.FAIXA_1.PERCENT}%`],
      [`Salário de R$${ctc.Inss.FAIXA_2.MIN} até R$${ctc.Inss.FAIXA_2.MAX}`, `${ctc.Inss.FAIXA_2.PERCENT}%`],
      [`Salário de R$${ctc.Inss.FAIXA_3.MIN} até R$${ctc.Inss.FAIXA_3.MAX}`, `${ctc.Inss.FAIXA_3.PERCENT}%`]
    ]
  }

}
