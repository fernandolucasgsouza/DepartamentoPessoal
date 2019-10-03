import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
