import { Component, OnInit } from '@angular/core';
import { ImpostosService } from 'src/app/core/services/business/impostos.service';
import { ITaxes } from 'src/app/core/interfaces';
import { Observable } from 'rxjs';
import { take } from 'rxjs/Operators';

@Component({
  selector: 'fs-impostos',
  templateUrl: './historico-impostos.component.html',
  styleUrls: ['./historico-impostos.component.css']
})
export class HistoricoImpostosComponent implements OnInit {

  public inssDatas$: Observable<any>;
  public irrfDatas: ITaxes[];
  public isLoading = false;
  public loading = 'Aguarde...';

  constructor(private serviceImpostos: ImpostosService) { }

  ngOnInit() {
    //  this.getInss();
    this.getIrrf();
    this.isLoading = true;
  }

  public async getInss(): Promise<void> {
    this.isLoading = await false;
    this.inssDatas$ = this.serviceImpostos.getInss();
    this.inssDatas$.pipe(take(1)).subscribe(() => this.isLoading = !this.isLoading);

    // this.serviceImpostos.getInss().subscribe(resp => {
    //   console.log(resp);
    //   this.inssDatas$ = resp;
    // });

  }

  public getIrrf() {

  }
}
