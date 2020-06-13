import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaxes } from 'src/app/core/interfaces';
import { ImpostosService } from 'src/app/core/services';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'fs-imposto-inss',
  templateUrl: './imposto-inss.component.html',
  styleUrls: ['./imposto-inss.component.css']
})
export class ImpostoInssComponent implements OnInit {

  public inssDatas$: Observable<any>;
  public irrfDatas: ITaxes[];
  public isLoading = true;
  public loading = 'Aguarde...';

  constructor(private serviceImpostos: ImpostosService) { }

  ngOnInit() {
     this.getInss();
    // this.getIrrf();
  }

  public async getInss(): Promise<void> {
    this.inssDatas$ = await this.serviceImpostos.getInss();
    this.inssDatas$.pipe(take(1)).subscribe(() => this.isLoading = false);
  }

  public getIrrf() {

  }

}
