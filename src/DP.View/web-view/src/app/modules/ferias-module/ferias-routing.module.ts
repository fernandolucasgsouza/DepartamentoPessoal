import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeriasComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'calcular', component: FeriasComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeriasRoutingModule { }
