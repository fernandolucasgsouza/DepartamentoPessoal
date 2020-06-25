import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoImpostosComponent, HistoricoImpostoInssComponent, HistoricoImpostoIrrfComponent } from './components';

const routes: Routes = [
  {
    path: '', component: HistoricoImpostosComponent,
    children: [
      {
        path: 'inss', component: HistoricoImpostoInssComponent
      },
      {
        path: 'irrf', component: HistoricoImpostoIrrfComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HistoricoImpostosComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpostoRoutingModule { }
