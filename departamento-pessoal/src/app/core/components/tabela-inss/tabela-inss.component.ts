import { Component, OnInit, Input } from '@angular/core';

import * as ctc from '../../constants/inss'

@Component({
  selector: 'app-tabela-inss',
  templateUrl: './tabela-inss.component.html',
  styleUrls: ['./tabela-inss.component.css']
})
export class TabelaInssComponent implements OnInit {

  
  public listHead:any = []
  public listBody:any[][]
  private inss: ctc.Inss

  constructor(
  ) { }

  ngOnInit() {
    this.createTable();
  }

  public createTable(){
    this.listHead = [
      {name:'Descrição', aling: 'text-left', width:'' },
      {name:'Percentual', aling: 'text-right', width:''}
    ]

    this.listBody = [
      [`Salário até R$${ctc.Inss.FAIXA_1.MAX}`, `${ctc.Inss.FAIXA_1.PERCENT}%`],
      [`Salário de R$${ctc.Inss.FAIXA_3.MIN} até R$${ctc.Inss.FAIXA_3.MAX}`, `${ctc.Inss.FAIXA_3.PERCENT}%`],
      [`Salário de R$${ctc.Inss.FAIXA_2.MIN} até R$${ctc.Inss.FAIXA_2.MAX}`, `${ctc.Inss.FAIXA_2.PERCENT}%`]
    ]    
  }

}
