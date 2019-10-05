import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InssComponent } from './components/inss/inss.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: InssComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InssRoutingModule { }
