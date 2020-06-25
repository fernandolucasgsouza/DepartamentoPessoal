import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { FeriasRoutingModule } from './ferias-routing.module';
import { FeriasComponent } from './components/ferias/ferias.component';
import { FeriasTabelaImpostosComponent } from './components/ferias-tabelas-impostos/ferias-tabelas-impostos.component';


@NgModule({
  declarations: [FeriasComponent, FeriasTabelaImpostosComponent],
  imports: [
    SharedModule,
    FeriasRoutingModule
  ]
})
export class FeriasModule { }
