import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { ITaxes } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImpostosService {

  public tableInss: Array<ITaxes>;
  public tableIrrf: Array<ITaxes>;

  Inss: Subject<ITaxes[]> = new Subject<ITaxes[]>();
  get Inss$() {
    return this.Inss.asObservable();
  }

  Irrf: Subject<ITaxes[]> = new Subject<ITaxes[]>();
  get Irrf$() {
    return this.Irrf.asObservable();
  }


  constructor() { }

  getInss(): Observable<ITaxes[]> {
    return of([
      { description: 'Faixa 01', minimum: 0, maximum: 1659.38, percentage: 8 },
      { description: 'Faixa 02', minimum: 1659.39, maximum: 2765.66, percentage: 9 },
      { description: 'Faixa 03', minimum: 2765.67, maximum: 5531.31, percentage: 11 },
    ]);
  }

  getIrrf(): Observable<ITaxes[]> {
    return of([
      { description: 'Faixa 01', minimum: 0, maximum: 1903.98, percentage: 0, deduction: 0 },
      { description: 'Faixa 02', minimum: 1903.99, maximum: 2826.65, percentage: 7.5, deduction: 142.8 },
      { description: 'Faixa 03', minimum: 2826.66, maximum: 3751.05, percentage: 15, deduction: 354.8 },
      { description: 'Faixa 04', minimum: 3751.06, maximum: 4664.68, percentage: 22.5, deduction: 636.13 },
      { description: 'Faixa 05', minimum: 4664.69, maximum: null, percentage: 27.5, deduction: 869.36 },
    ]);
  }

  getDepente(): Observable<any> {
    return of([
      { descricao: 'Faixa dependente', valor: 189.59 },
    ]);
  }

}
