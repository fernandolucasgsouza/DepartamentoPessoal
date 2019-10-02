import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpostosComponent } from './components/impostos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: ImpostosComponent
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
