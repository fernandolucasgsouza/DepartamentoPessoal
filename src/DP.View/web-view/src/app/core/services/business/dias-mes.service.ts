import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CodeDescriptionModel } from '../../models/code-description.model';

@Injectable({
  providedIn: 'root'
})
export class DiasMesService {

  constructor() { }


  getDiasMes(): Observable<CodeDescriptionModel[]> {
    return of([
      { code: 0, description: '0' },
      { code: 1, description: '01' },
      { code: 2, description: '02' },
      { code: 3, description: '03' },
      { code: 4, description: '04' },
      { code: 5, description: '05' },
      { code: 7, description: '07' },
      { code: 8, description: '08' },
      { code: 9, description: '09' },
      { code: 10, description: '10' },
      { code: 11, description: '11' },
      { code: 11, description: '11' },
      { code: 12, description: '12' },
      { code: 13, description: '13' },
      { code: 14, description: '14' },
      { code: 15, description: '15' },
      { code: 16, description: '16' },
      { code: 17, description: '17' },
      { code: 18, description: '18' },
      { code: 19, description: '19' },
      { code: 20, description: '20' },
      { code: 21, description: '21' },
      { code: 22, description: '22' },
      { code: 23, description: '23' },
      { code: 24, description: '24' },
      { code: 25, description: '25' },
      { code: 26, description: '26' },
      { code: 27, description: '27' },
      { code: 28, description: '28' },
      { code: 29, description: '29' },
      { code: 30, description: '30' },
    ])
  }
}
