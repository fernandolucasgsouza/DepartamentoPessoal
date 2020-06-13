import { NgModule } from '@angular/core';

import { ImpostoRoutingModule } from './imposto-routing.module';
import { ImpostoInssComponent } from './components/imposto-inss/imposto-inss.component';
import { ImpostoIrrfComponent } from './components/imposto-irrf/imposto-irrf.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ImpostoInssComponent,
    ImpostoIrrfComponent
  ],
  imports: [
    SharedModule,
    ImpostoRoutingModule
  ]
})
export class ImpostoModule { }
