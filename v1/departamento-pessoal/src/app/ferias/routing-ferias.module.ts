import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as c from './components';

const routes: Routes = [
    {path: '', component: c.CalcularFeriasComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class RoutingFeriasModule { }
