import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { DiasMesService } from 'src/app/core/services/business/dias-mes.service';
import { ImpostosService } from 'src/app/core/services';
import { InssModel } from 'src/app/core/models';
import { Observable } from 'rxjs';

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

  public modal = {
    inss: null,
    irrf: null
  }

  constructor(
    private _fb: FormBuilder,
    private _serviceImpostos: ImpostosService,
    private _serviceDiasMes: DiasMesService
  ) {
    this.form = _fb.group(this.fbGroup)
  }

  ngOnInit() {
    this._serviceDiasMes.getDiasMes().subscribe((days) => this.datas = days);
    this._serviceImpostos.getInss().subscribe(resp => this._serviceImpostos.tableInss = resp);
    this._serviceImpostos.getIRRF().subscribe(resp => this._serviceImpostos.tableIrrf = resp);
  }

  changeField(value: string | number, controlName: string) {
    this.form.get(controlName).setValue(value);
  }



  onSubmit() {
    console.log(this.form.value);
    // if (this.form.invalid) {
    //   const errors = new ValidationMessageComponent();
    //   errors.errorMessageAll(this.form);
    // }
  }

}
