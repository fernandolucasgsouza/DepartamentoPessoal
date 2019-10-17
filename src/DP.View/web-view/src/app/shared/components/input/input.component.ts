import { Component, Input, Renderer2 } from '@angular/core';
import { ControlValueAcessorProvider, CUSTOM_CONTROL_ACESS } from 'src/app/core/providers/control-value-acessor.providers';

/**
 * @example html
  <fs-input
    label="Salário"
    id="salario"
    formControlName="salario"
    [control]="form.get('salario')"
    mask="dot_separator.2"
    placeholder="0,00"
  >
  </fs-input>
 **/

@Component({
  selector: 'fs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CUSTOM_CONTROL_ACESS.Values(InputComponent)]
})
export class InputComponent extends ControlValueAcessorProvider {

  @Input() mask: any;
  @Input() type = 'text';

  public element: any;

  constructor(private _renderer: Renderer2) {
    super();
    this._currentValue = '';
  }

}
