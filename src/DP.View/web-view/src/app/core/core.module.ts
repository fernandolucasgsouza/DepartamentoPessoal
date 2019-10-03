import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SharedModule,
    FooterComponent

  ],

})
export class CoreModule { }
