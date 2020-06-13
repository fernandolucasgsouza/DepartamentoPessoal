import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITaxes } from '../../interfaces';
import { ColletionBaseService } from '../base/colletion-base.service';

@Injectable({
  providedIn: 'root'
})
export class ImpostosService {

  constructor(private base: ColletionBaseService<ITaxes>) { }

  getInss() {
    return this.base.getAll('taxeInss');
  }

  getIrrf() {
    return this.base.getAll('taxeIrrf');
  }

  getDepente(): Observable<any> {
    return of([
      { descricao: 'Faixa dependente', valor: 189.59 },
    ]);
  }

}
