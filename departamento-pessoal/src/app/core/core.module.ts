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
    cc.ValidationMessageComponent
  ],
  declarations: [
    dc.MaskDirective,
    cc.ValidationMessageComponent,
    cc.ModalComponent,
  ],
  providers: [
    sc.ValidationService
  ]
})
export class CoreModule { }
