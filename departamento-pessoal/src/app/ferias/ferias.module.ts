import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as cc from '../core/core.module';
import * as c from './components';
import * as s from './services';
import * as me from './routing-ferias.module';

@NgModule({
  imports: [
    CommonModule,
    me.RoutingFeriasModule,
    ReactiveFormsModule,
    FormsModule,
    cc.CoreModule
  ],
  declarations: [
    c.CalcularFeriasComponent
  ],
  providers: [
    FormBuilder,
    s.FeriasService
  ]
})
export class FeriasModule { }
