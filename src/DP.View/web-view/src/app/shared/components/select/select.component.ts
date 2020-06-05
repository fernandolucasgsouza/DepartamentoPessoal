import { Component, Input } from '@angular/core';

import { ICodeDescription } from 'src/app/core/interfaces/code-description.interface';
import { CUSTOM_CONTROL_ACCESS } from 'src/app/core/providers/custom_control_access';
import { ControlValueAcessorDirective } from 'src/app/core/directives/control-value-acessor.directive';


@Component({
  selector: 'fs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [CUSTOM_CONTROL_ACCESS.Values(SelectComponent)]
})

/**
 *
 * @exemple html
 *  <fs-select
 *     label="Nomes"
 *     id="nomes"
 *     helper="Nomes de dependentes"
 *     [items]="datas"
 *     formControlName="nomes"
 *     [control]="form.get('nomes')"
 *     isReadOnly="false"
 *     (onChangeSelect)="changeSelect($event)"
 *     >
 *   </fs-select>
 *
 * @exemple ts setar o valor Init
 *   ngOnInit() {
 *     this.setName()
 *   }
 *
 *   setName() {
 *     const nome = { code: 2, description: 'Lucas', sigla: 'LU' }
 *     this.form.get('nomes').setValue(nome);
 *   }
 */
export class SelectComponent extends ControlValueAcessorDirective {

  @Input() items: Array<ICodeDescription>;

  constructor() {
    super();
    this.currentValue = '';
  }

  compareItems(obj1: ICodeDescription, obj2: ICodeDescription) {
    return obj1 && obj2 ? (obj1.code === obj2.code) : obj1 === obj2;
  }

}
