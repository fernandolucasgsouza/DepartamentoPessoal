import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  form: FormGroup;
  fbGroup = {
    nomes: [{ value: '', disabled: false }, [Validators.required]],
    salario: ['', [Validators.required]],
    horasExtras: ['',],
    diasFalta: ['', [Validators.required]],
    diasFerias: ['', [Validators.required, Validators.max(30)]],
    dependentes: ['', [Validators.required]],
    text: ['', [Validators.required]]
  }
  constructor(private _fb: FormBuilder) {
    this.form = _fb.group(this.fbGroup)
  }

  public datas: Array<CodeDescriptionModel> = [];
  ngOnInit() {
    this.datas = [
      { code: 1, description: 'Fernando', sigla: 'FE' },
      { code: 2, description: 'Lucas', sigla: 'LU' },
      { code: 3, description: 'Gomes', sigla: 'GO' },
      { code: 4, description: 'Souza', sigla: 'SO' }
    ];
    this.setNames();
  }

  setNames() {
    const nome = { code: 2, description: 'Lucas', sigla: 'LU' }
    this.form.get('nomes').setValue(nome);
  }

  changeSelect(e) {
    console.log('changed', e);

  }
  onSubmit() {

    if (this.form.invalid) {
      const errors = new ValidationMessageComponent();
      errors.errorMessageAll(this.form);
    }
  }

}
