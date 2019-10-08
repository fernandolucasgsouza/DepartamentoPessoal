import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    FooterComponent
  ],

  providers: []
})
export class CoreModule { }
