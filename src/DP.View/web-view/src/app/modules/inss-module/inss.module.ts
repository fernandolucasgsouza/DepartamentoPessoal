import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InssRoutingModule } from './inss-routing.module';
import { InssComponent } from './components/inss/inss.component';


@NgModule({
  declarations: [InssComponent],
  imports: [
    CommonModule,
    InssRoutingModule
  ]
})
export class InssModule { }
