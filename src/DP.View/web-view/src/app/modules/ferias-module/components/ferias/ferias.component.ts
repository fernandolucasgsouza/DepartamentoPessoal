import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { DiasMesService } from 'src/app/core/services/business/dias-mes.service';
import { ImpostosService } from 'src/app/core/services';
import { InssModel, IrrfModel } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { CalculaPercentualPipe } from 'src/app/shared/pipes/calcula-percentual/calcula-percentual.pipe';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {

  public datas: Array<CodeDescriptionModel> = [];
  public INSS: InssModel[] = [];
  public IRRF: IrrfModel[] = [];
  public deducaoDependente: number;
  public valorTotal: number;
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
    private _serviceDiasMes: DiasMesService,
    private _pipeCalcPercent: CalculaPercentualPipe
  ) {
    this.form = _fb.group(this.fbGroup);
    this._serviceImpostos.Inss$.subscribe(res => { this.INSS = res; console.log(this.INSS) });
    this._serviceImpostos.Irrf$.subscribe(res => { this.IRRF = res; console.log(this.IRRF) });
  }

  ngOnInit() {
    this._serviceDiasMes.getDiasMes().subscribe((days) => this.datas = days);
    this._serviceImpostos.getInss().subscribe(res => this._serviceImpostos.Inss.next(res));
    this._serviceImpostos.getIRRF().subscribe(res => this._serviceImpostos.Irrf.next(res));
    this._serviceImpostos.getDepennte().subscribe(res => this.deducaoDependente = res)
  }

  changeField(value: string | number, controlName: string) {
    this.form.get(controlName).setValue(value);
    console.log(this.form.get(controlName).value);
  }

  calcular() {
    const val_ferias = this._calculaFerias(+this.fbGroup.salario.values, +this.fbGroup.horasExtras.values, +this.fbGroup.diasFerias.values);
    const val_um_terco_ferias = (val_ferias / 3);
    const val_inss = this._calculaInssFerias(val_ferias, val_um_terco_ferias);
    const val_irrf = this._calculaIrrfFerias(val_ferias, val_um_terco_ferias, +this.fbGroup.dependentes.values, val_inss);
    const tot_proventos = (val_ferias | 0) + (val_um_terco_ferias | 0);
    const tot_descontos = (val_inss | 0) + (val_irrf | 0);
    this.valorTotal = tot_proventos - tot_descontos;

  }

  private _calculaFerias(salario = 0, horas_extras = 0, dias_ferias = 0) {
    return dias_ferias * ((salario + horas_extras) / 30)
  }

  private _calculaInssFerias(valor_ferias_receber = 0, um_terco_receber = 0) {
    let percentual = 0;

    const faixa_01 = this.INSS[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1659.38, perc: 8 }
    const faixa_02 = this.INSS[1]; // 1: { descricao: "Faixa 02", min: 1659.39, max: 2765.66, perc: 9 }
    const faixa_03 = this.INSS[2]; // 2: { descricao: "Faixa 03", min: 2765.67, max: 5531.31, perc: 11 }

    const val_ferias_bruto = valor_ferias_receber + um_terco_receber;
    const val_receber_base = (+val_ferias_bruto < faixa_03.max) ? val_ferias_bruto : faixa_03.max;

    if (val_receber_base <= +faixa_01.perc)
      percentual = +faixa_01.perc;
    else if ((val_receber_base > faixa_01.max) && (val_receber_base <= faixa_02.max))
      percentual = +faixa_02.perc;
    else if (val_receber_base > faixa_02.max)
      percentual = +faixa_03.perc;

    return this._pipeCalcPercent.transform(valor_ferias_receber, percentual);
  }

  private _calculaIrrfFerias(val_ferias_receber = 0, val_um_terco_receber = 0, tot_dependentes = 0, val_inss = 0) {
    const faixa_01 = this.IRRF[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1903.98, perc: 0, deducao: 0 }
    const faixa_02 = this.IRRF[1]; // 1: { descricao: "Faixa 02", min: 1903.98, max: 2826.65, perc: 7.5, deducao: 142.8 }
    const faixa_03 = this.IRRF[2]; // 2: { descricao: "Faixa 03", min: 2826.66, max: 3751.05, perc: 15, deducao: 354.8 }
    const faixa_04 = this.IRRF[3]; // 3: { descricao: "Faixa 04", min: 3751.06, max: 4664.68, perc: 22.5, deducao: 636.13 }
    const faixa_05 = this.IRRF[4]; // 4: { descricao: "Faixa 05", min: 4664.69, max: null, perc: 27.5, deducao: 869.36 }

    const val_total_dependentes = this.deducaoDependente * tot_dependentes;
    const val_base = (val_ferias_receber + val_um_terco_receber) - (val_inss + val_total_dependentes);

    if ((val_base > faixa_01.max) && (val_base <= faixa_02.max)) {
      return this._calculoIRRF(Number(val_base), Number(faixa_02.perc), Number(faixa_02.deducao));
    }
    if ((val_base > faixa_02.max) && (val_base <= faixa_03.max)) {
      return this._calculoIRRF(Number(val_base), Number(faixa_03.perc), Number(faixa_03.deducao));
    }
    if ((val_base > faixa_03.max) && (val_base <= faixa_04.max)) {
      return this._calculoIRRF(Number(val_base), Number(faixa_04.perc), Number(faixa_04.deducao));
    }
    if (val_base > faixa_05.max) {
      return this._calculoIRRF(Number(faixa_02.perc), Number(val_base), Number(faixa_02.deducao));
    } else {
      return 0;
    }
  }

  private _calculoIRRF(valor_base: number, percentual: number, deducao: number) {
    const valor_bruto = this._pipeCalcPercent.transform(valor_base, percentual);
    return valor_bruto - deducao;
  }

  onSubmit() {
    // console.log(this.form.value);
    // if (this.form.invalid) {
    //   const errors = new ValidationMessageComponent();
    //   errors.errorMessageAll(this.form);
    // }
  }

}
