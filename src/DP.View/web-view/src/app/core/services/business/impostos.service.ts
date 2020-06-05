import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { InssModel, IrrfModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ImpostosService {

  Inss: Subject<InssModel[]> = new Subject<InssModel[]>();
  get Inss$() {
    return this.Inss.asObservable();
  }

  Irrf: Subject<IrrfModel[]> = new Subject<IrrfModel[]>();
  get Irrf$() {
    return this.Irrf.asObservable();
  }

  public tableInss: Array<InssModel>;
  public tableIrrf: Array<IrrfModel>;

  constructor() { }

  getInss(): Observable<InssModel[]> {
    return of([
      { descricao: 'Faixa 01', min: 0, max: 1659.38, perc: 8 },
      { descricao: 'Faixa 02', min: 1659.39, max: 2765.66, perc: 9 },
      { descricao: 'Faixa 03', min: 2765.67, max: 5531.31, perc: 11 },
    ]);
  }

  getIRRF(): Observable<IrrfModel[]> {
    return of([
      { descricao: 'Faixa 01', min: 0, max: 1903.98, perc: 0, deducao: 0 },
      { descricao: 'Faixa 02', min: 1903.99, max: 2826.65, perc: 7.5, deducao: 142.8 },
      { descricao: 'Faixa 03', min: 2826.66, max: 3751.05, perc: 15, deducao: 354.8 },
      { descricao: 'Faixa 04', min: 3751.06, max: 4664.68, perc: 22.5, deducao: 636.13 },
      { descricao: 'Faixa 05', min: 4664.69, max: null, perc: 27.5, deducao: 869.36 },
    ]);
  }

  getDepente(): Observable<any> {
    return of([
      { descricao: 'Faixa dependente', valor: 189.59 },
    ]);
  }

}
