import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ImpostosService } from 'src/app/core/services';

@Component({
  selector: 'fs-tabela-inss',
  templateUrl: './tabela-inss.component.html',
  styleUrls: ['./tabela-inss.component.css']
})
export class TabelaInssComponent implements OnInit {

  public inssDatas$ = new Observable();

  constructor(private impostosService: ImpostosService) {
  }

  ngOnInit(): void {
    this.getInss();
  }

  public async getInss() {
    this.inssDatas$ = await this.impostosService.getInss();
  }
}
