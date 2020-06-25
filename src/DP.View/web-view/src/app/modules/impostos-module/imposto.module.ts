import { NgModule } from '@angular/core';

import { ImpostoRoutingModule } from './imposto-routing.module';
import { HistoricoImpostoInssComponent, HistoricoImpostoIrrfComponent } from './components';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HistoricoImpostoInssComponent,
    HistoricoImpostoIrrfComponent
  ],
  imports: [
    SharedModule,
    ImpostoRoutingModule
  ]
})
export class ImpostoModule { }
