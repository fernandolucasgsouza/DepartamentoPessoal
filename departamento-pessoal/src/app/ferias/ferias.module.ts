import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as c from './components';
import * as s from './services';
import * as me from './routing-ferias.module';

@NgModule({
  imports: [
    CommonModule,
    me.RoutingFeriasModule
  ],
  declarations: [
    c.CalcularFeriasComponent
  ],
  providers: [
    s.FeriasService
  ]
})
export class FeriasModule { }
