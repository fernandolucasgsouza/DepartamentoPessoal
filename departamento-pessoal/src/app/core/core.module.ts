import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as mdec from './core-routing.module';
import * as dc from './directives';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    mdec.CoreRoutingModule

  ],
  exports:[
    HttpModule,
    FormsModule,
    dc.MaskDirective,
    dc.ValidationDirective
  ],
  declarations: [
    dc.MaskDirective,
    dc.ValidationDirective
  ]
})
export class CoreModule { }
