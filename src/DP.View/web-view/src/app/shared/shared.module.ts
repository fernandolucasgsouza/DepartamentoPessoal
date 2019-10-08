import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';


@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    ValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ValidationMessageComponent
  ],
  providers: [],
})
export class SharedModule {

}
