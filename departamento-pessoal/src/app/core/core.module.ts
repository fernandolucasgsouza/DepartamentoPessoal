import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as mdec from './core-routing.module';
import * as dc from './directives';
import * as cc from './components';
import * as sc from './services';
import * as pc from './pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    mdec.CoreRoutingModule

  ],
  exports: [
    HttpModule,
    FormsModule,
    dc.MaskDirective,
    pc.FormatCurrencyPipe,
    cc.ValidationMessageComponent,
    cc.ModalComponent,
    cc.TableComponent,
    cc.TabelaInssComponent,
    cc.TabelaIrrfComponent
  ],
  declarations: [
    dc.MaskDirective,
    pc.FormatCurrencyPipe,
    cc.ValidationMessageComponent,
    cc.ModalComponent,
    cc.TableComponent,
    cc.TabelaInssComponent,
    cc.TabelaIrrfComponent
  ],
  providers: [
    sc.ValidationService
  ]
})
export class CoreModule { }
