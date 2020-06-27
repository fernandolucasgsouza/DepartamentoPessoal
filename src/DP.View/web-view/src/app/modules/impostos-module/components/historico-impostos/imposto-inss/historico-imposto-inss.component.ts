import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/Operators';

import { ITaxes } from 'src/app/core/interfaces';
import { ImpostosService } from 'src/app/core/services';
import { Orderby } from 'src/app/core/enums/orderby';

@Component({
  selector: 'fs-imposto-inss',
  templateUrl: './historico-imposto-inss.component.html',
  styleUrls: ['./historico-imposto-inss.component.css']
})
export class HistoricoImpostoInssComponent implements OnInit {

  public datas$: Observable<any>;
  public inssCollection: ITaxes[] = [];

  constructor(private serviceImpostos: ImpostosService) { }

  ngOnInit() {
    this.getInss();
  }

  private async getInss(): Promise<void> {
    this.datas$ = await this.serviceImpostos.getInss();
    this.datas$.pipe(take(1)).subscribe((data) => {
      if (!data) { return; }
      this.orderby(data, 'year', Orderby.DESC);
      this.inssCollection = data;
    });
  }

  private orderby(array, itemOrder: string, typeOrder: Orderby = Orderby.ESC) {
    if (typeOrder === Orderby.ESC) {
      return array.sort((a, b) => a[itemOrder] - b[itemOrder]);
    }
    if (typeOrder === Orderby.DESC) {
      return array.sort((a, b) => b[itemOrder] - a[itemOrder]);
    }
  }
}
