import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as mdec from './core-routing.module';

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
  ],
  declarations: []
})
export class CoreModule { }
