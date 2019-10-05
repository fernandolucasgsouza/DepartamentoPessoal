import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { FeriasRoutingModule } from './ferias-routing.module';
import { FeriasComponent } from './components/ferias/ferias.component';


@NgModule({
  declarations: [FeriasComponent],
  imports: [
    SharedModule,
    FeriasRoutingModule
  ]
})
export class FeriasModule { }
