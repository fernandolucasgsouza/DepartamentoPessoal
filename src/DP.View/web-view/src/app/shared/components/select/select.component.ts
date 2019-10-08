import { Component, Input } from '@angular/core';

import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { ControlValueAcessorProvider, CUSTOM_CONTROL_ACESS } from 'src/app/core/providers/control-value-acessor.providers';


@Component({
  selector: 'fs-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [CUSTOM_CONTROL_ACESS.Values(SelectComponent)]
})

/**
 * @exemple html
 *  <fs-select
      label="Nomes"
      id="nomes"
      helper="Nomes de dependentes"
      [items]="datas"
      formControlName="nomes"
      [control]="form.get('nomes')"
      isReadOnly="false"
      (onChangeSelect)="changeSelect($event)"
      >
    </fs-select>

    * @exemple ts setar o valor Init
    ngOnInit() {
      this.setName()
    }

    setName() {
      const nome = { code: 2, description: 'Lucas', sigla: 'LU' }
      this.form.get('nomes').setValue(nome);
    }
 */
export class SelectComponent extends ControlValueAcessorProvider {

  @Input() items: Array<CodeDescriptionModel>;

  constructor() {
    super();
  }

  compareItems(obj1: CodeDescriptionModel, obj2: CodeDescriptionModel) {
    return obj1 && obj2 ? (obj1.code === obj2.code) : obj1 === obj2;
  }

}
