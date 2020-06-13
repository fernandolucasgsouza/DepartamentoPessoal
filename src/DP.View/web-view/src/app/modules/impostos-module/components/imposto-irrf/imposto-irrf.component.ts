import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaxes } from 'src/app/core/interfaces';
import { ImpostosService } from 'src/app/core/services';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'fs-imposto-irrf',
  templateUrl: './imposto-irrf.component.html',
  styleUrls: ['./imposto-irrf.component.css']
})
export class ImpostoIrrfComponent implements OnInit {

  public irrfDatas$: Observable<any>;
  public isLoading = true;
  public loading = 'Aguarde...';

  constructor(private serviceImpostos: ImpostosService) { }

  ngOnInit() {
    this.getIrrf();
  }

  public async getIrrf() {
    this.irrfDatas$ = await this.serviceImpostos.getIrrf();
    this.irrfDatas$.pipe(take(1)).subscribe(() => this.isLoading = false);
  }

}
