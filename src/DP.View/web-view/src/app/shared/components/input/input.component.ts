import { Component, Input, Renderer2 } from '@angular/core';
import { ControlValueAcessorDirective } from 'src/app/core/directives/control-value-acessor.directive';
import { CUSTOM_CONTROL_ACCESS } from 'src/app/core/providers/custom_control_access';

/**
 * @example html
 * <fs-input
 *   label="Salário"
 *   id="salario"
 *   formControlName="salario"
 *   [control]="form.get('salario')"
 *   mask="dot_separator.2"
 *   placeholder="0,00"
 * >
 * </fs-input>
 */
@Component({
  selector: 'fs-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [CUSTOM_CONTROL_ACCESS.Values(InputComponent)]
})
export class InputComponent extends ControlValueAcessorDirective {

  @Input() mask: any;
  @Input() type = 'text';

  public element: any;

  constructor(private renderer: Renderer2) {
    super();
    this.currentValue = '';
  }

}
