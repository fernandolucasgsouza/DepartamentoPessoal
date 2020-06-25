import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { CalculaPercentualPipe } from './pipes/calcula-percentual/calcula-percentual.pipe';
import { FormatCurrencyPipe } from './pipes/format-currency/format-currency.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { TabelaInssComponent } from './components/business/impostos/tabela-inss/tabela-inss.component';
import { TabelaIrrfComponent } from './components/business/impostos/tabela-irrf/tabela-irrf.component';


@NgModule({
  declarations: [
    InputComponent,
    SelectComponent,
    ValidationMessageComponent,
    TextAreaComponent,
    ModalComponent,
    TabelaInssComponent,
    TabelaIrrfComponent,

    CalculaPercentualPipe,
    FormatCurrencyPipe,
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
    TextAreaComponent,
    ValidationMessageComponent,
    ModalComponent,
    TabelaInssComponent,
    TabelaIrrfComponent,

    CalculaPercentualPipe,
    FormatCurrencyPipe
  ],
  providers: [
    CalculaPercentualPipe,
    FormatCurrencyPipe
  ],
})
export class SharedModule {

}
