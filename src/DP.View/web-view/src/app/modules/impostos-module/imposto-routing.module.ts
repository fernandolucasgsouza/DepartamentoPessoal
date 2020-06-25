import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HistoricoImpostosComponent,
  HistoricoImpostoInssComponent,
  HistoricoImpostoIrrfComponent,
  TabelasImpostosComponent,
} from './components';

const routes: Routes = [
  { path: 'tabela/:id', component: TabelasImpostosComponent, data: { state: 'router-animation' } },
  {
    path: 'historico', component: HistoricoImpostosComponent,
    children: [
      { path: 'inss', component: HistoricoImpostoInssComponent },
      { path: 'irrf', component: HistoricoImpostoIrrfComponent },
    ]
  },
];

@NgModule({
  declarations: [HistoricoImpostosComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpostoRoutingModule { }
