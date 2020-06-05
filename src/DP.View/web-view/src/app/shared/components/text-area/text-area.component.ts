import { Component } from '@angular/core';
import { ControlValueAcessorDirective } from 'src/app/core/directives/control-value-acessor.directive';
import { CUSTOM_CONTROL_ACCESS } from 'src/app/core/providers/custom_control_access';


/**
 *
 * @exemple html
 * <fs-text-area
 *  label="Descrição"s
 *  id="text"
 *  formControlName="text"
 *  [control]="form.get('text')"
 *  isReadOnly="true"
 *  placeholder="Adicione aqui sua descrição..."
 *  >
 * </fs-text-area>
 */
@Component({
  selector: 'fs-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  providers: [CUSTOM_CONTROL_ACCESS.Values(TextAreaComponent)]
})
export class TextAreaComponent extends ControlValueAcessorDirective {

  constructor() {
    super();
  }

}
