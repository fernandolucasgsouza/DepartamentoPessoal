import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { DiasMesService } from 'src/app/core/services/business/dias-mes.service';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {

  public datas: Array<CodeDescriptionModel> = [];
  form: FormGroup;
  fbGroup = {
    salario: ['', [Validators.required, Validators.maxLength(8), Validators.max(25000)]],
    horasExtras: ['', Validators.required],
    diasFalta: ['', [Validators.required, Validators.max(30)]],
    diasFerias: ['', [Validators.required, Validators.max(30)]],
    dependentes: ['', [Validators.required, Validators.max(10)]],
  }

  constructor(
    private _fb: FormBuilder,
    private _serviceDiasMes: DiasMesService
  ) {
    this.form = _fb.group(this.fbGroup)
  }

  ngOnInit() {
    this._serviceDiasMes.getDiasMes().subscribe((days) => this.datas = days);
  }

  onSubmit() {
    if (this.form.invalid) {
      const errors = new ValidationMessageComponent();
      errors.errorMessageAll(this.form);
    }
  }

}
