import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImpostosService } from 'src/app/core/services';
import { take } from 'rxjs/internal/operators/take';
import { ITaxes } from 'src/app/core/interfaces';
import { Orderby } from 'src/app/core/enums/orderby';

@Component({
  selector: 'fs-imposto-irrf',
  templateUrl: './historico-imposto-irrf.component.html',
  styleUrls: ['./historico-imposto-irrf.component.css']
})
export class HistoricoImpostoIrrfComponent implements OnInit {

  public datas$: Observable<any>;
  public irrfCollection: ITaxes[] = [];

  constructor(private serviceImpostos: ImpostosService) { }

  ngOnInit() {
    this.getIrrf();
  }

  public async getIrrf() {
    this.datas$ = await this.serviceImpostos.getIrrf();
    this.datas$.pipe(take(1)).subscribe((data) => {
      if (!data) { return; }
      this.orderby(data, 'year', Orderby.DESC);
      this.irrfCollection = data;
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
