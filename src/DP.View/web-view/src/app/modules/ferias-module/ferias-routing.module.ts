import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeriasComponent, FeriasTabelaImpostosComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'calcular', component: FeriasComponent },
      { path: 'tabela/:id', component: FeriasTabelaImpostosComponent, data: { state: 'router-animation' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeriasRoutingModule { }
