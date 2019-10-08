import { Component } from '@angular/core';
import { ControlValueAcessorProvider, CUSTOM_CONTROL_ACESS } from 'src/app/core/providers/control-value-acessor.providers';


/**
 * @exemple html
  <fs-text-area
    label="Descrição"
    id="text"
    formControlName="text"
    [control]="form.get('text')"
    isReadOnly="true"
    placeholder="Adicione aqui sua descrição..."
    >
  </fs-text-area>
 */
@Component({
  selector: 'fs-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [CUSTOM_CONTROL_ACESS.Values(TextAreaComponent)]
})
export class TextAreaComponent extends ControlValueAcessorProvider {

  constructor() {
    super();
  }

}
