import { Component, OnInit } from '@angular/core';
import { ImpostosService } from 'src/app/core/services/business/impostos.service';
import { ITaxes } from './../../../../../core/interfaces/taxes.interface';
import { Observable } from 'rxjs/internal/Observable';
import { async } from '@angular/core/testing';

@Component({
  selector: 'fs-tabela-irrf',
  templateUrl: './tabela-irrf.component.html',
  styleUrls: ['./tabela-irrf.component.css']
})
export class TabelaIrrfComponent implements OnInit {

  public irrfDatas$ = new Observable();
  constructor(private impostosService: ImpostosService) {
  }

  ngOnInit(): void {
    this.getIrrf();
  }

  public async getIrrf() {
    this.irrfDatas$ = await this.impostosService.getIrrf();
  }
}
