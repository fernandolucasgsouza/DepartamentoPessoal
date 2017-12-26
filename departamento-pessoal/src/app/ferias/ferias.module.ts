import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import * as mdec from '../core/core.module';
import * as pc from '../core/pipes';
import * as cc from '../core/components';
import * as c from './components';
import * as s from './services';
import * as me from './routing-ferias.module';

@NgModule({
  imports: [
    CommonModule,
    me.RoutingFeriasModule,
    ReactiveFormsModule,
    FormsModule,
    mdec.CoreModule,
    cc.TabelaInssComponent
  ],
  declarations: [
    c.CalcularFeriasComponent,
    
  ],
  providers: [
    FormBuilder,
    s.FeriasService,
    pc.CalculaPercentualPipe
  ],
  entryComponents:[
    c.CalcularFeriasComponent,
    cc.TabelaInssComponent
  ]
})
export class FeriasModule { }
