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
  public inssDatas2 = new Observable();

  constructor(private impostosService: ImpostosService) {
  }

  ngOnInit(): void {
    this.getInss();
  }

  public getInss() {
    this.inssDatas$ = this.impostosService.getInss();
  }
}
