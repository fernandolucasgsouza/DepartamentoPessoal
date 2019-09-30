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
    dc.MaskDecimalDirective,
    pc.FormatCurrencyPipe,
    cc.ValidationMessageComponent,
    cc.ModalComponent,
    cc.TableComponent,
    cc.TabelaInssComponent,
    cc.TabelaIrrfComponent,
    cc.FooterComponent,
    cc.InputComponent
  ],
  declarations: [
    dc.MaskDirective,
    dc.MaskDecimalDirective,
    pc.FormatCurrencyPipe,
    cc.ValidationMessageComponent,
    cc.ModalComponent,
    cc.TableComponent,
    cc.TabelaInssComponent,
    cc.TabelaIrrfComponent,
    cc.FooterComponent,
    cc.InputComponent,
  ],
  providers: [
    sc.ValidationService,
    pc.FormatCurrencyPipe,
  ]
})
export class CoreModule { }
