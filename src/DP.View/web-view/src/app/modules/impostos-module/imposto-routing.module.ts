import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpostosComponent } from './components/impostos.component';
import { ImpostoInssComponent } from './components/imposto-inss/imposto-inss.component';
import { ImpostoIrrfComponent } from './components/imposto-irrf/imposto-irrf.component';

const routes: Routes = [
  {
    path: '', component: ImpostosComponent,
    children: [
      {
        path: 'inss', component: ImpostoInssComponent
      },
      {
        path: 'irrf', component: ImpostoIrrfComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ImpostosComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpostoRoutingModule { }
