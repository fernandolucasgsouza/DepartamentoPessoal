import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { CodeDescriptionModel } from 'src/app/core/models/code-description.model';
import { DiasMesService } from 'src/app/core/services/business/dias-mes.service';
import { ImpostosService } from 'src/app/core/services';
import { InssModel, IrrfModel } from 'src/app/core/models';
import { CalculaPercentualPipe } from 'src/app/shared/pipes/calcula-percentual/calcula-percentual.pipe';
import { FaltasProvider } from 'src/app/core/providers/business/faltas.providers';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  private _toogle: boolean;
  percentual = { inss: 0, irrf: 0 };
  valor = {
    ferias: 0,
    umTercoFerias: 0,
    inss: 0,
    irrf: 0,
    deducaoDependente: 0,
    subTotProventos: 0,
    subTotDescontos: 0,
    total: 0,
  }
  datas: Array<CodeDescriptionModel> = [];
  datasCopy: Array<CodeDescriptionModel> = [];
  INSS: InssModel[] = [];
  IRRF: IrrfModel[] = [];
  form: FormGroup;
  fbGroup = {
    salario: ['', [Validators.required, Validators.maxLength(8), Validators.max(25000)]],
    horasExtras: ['', Validators.required],
    diasFalta: ['', [Validators.required, Validators.max(FaltasProvider.FAIXA_5.ACIMA + 1)]],
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
    this._serviceDiasMes.getDiasMes().subscribe((days) => this.datasCopy = [...this.datas] = days);
    this._serviceImpostos.getInss().subscribe(res => this._serviceImpostos.Inss.next(res));
    this._serviceImpostos.getIRRF().subscribe(res => this._serviceImpostos.Irrf.next(res));
    this._serviceImpostos.getDepennte().subscribe(res => this.valor.deducaoDependente = res[0])
  }

  changeField(value: string | number, controlName: string) {
    this.form.get(controlName).setValue(value);
    if (controlName == 'diasFalta') this._verificaFaltas();
  }

  private _calcular() {
    this.valor.ferias = this._calculaFerias();
    this.valor.umTercoFerias = (this.valor.ferias / 3);

    this.valor.inss = this._calculaInssFerias(this.valor.ferias, this.valor.umTercoFerias);
    this.valor.irrf = this._calculaIrrfFerias(this.valor.ferias, this.valor.umTercoFerias, this.valor.inss);

    this.valor.subTotProventos = (this.valor.ferias || 0) + (this.valor.umTercoFerias || 0);
    this.valor.subTotDescontos = (this.valor.inss || 0) + (this.valor.irrf || 0);

    this.valor.total = this.valor.subTotProventos - this.valor.subTotDescontos;
  }

  private _calculaFerias() {
    const dias_ferias = this.form.get('diasFerias').value.code || 0;
    const salario = this.form.get('salario').value || 0;
    const horas_extras = this.form.get('horasExtras').value || 0;
    return Number(dias_ferias) * ((Number(salario) + Number(horas_extras)) / 30);
  }

  private _calculaInssFerias(valor_ferias_receber = 0, um_terco_receber = 0) {
    let percentual = 0;
    const faixa_01 = this.INSS[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1659.38, perc: 8 }
    const faixa_02 = this.INSS[1]; // 1: { descricao: "Faixa 02", min: 1659.39, max: 2765.66, perc: 9 }
    const faixa_03 = this.INSS[2]; // 2: { descricao: "Faixa 03", min: 2765.67, max: 5531.31, perc: 11 }

    const val_ferias_bruto = valor_ferias_receber + um_terco_receber;
    const val_receber_base = (+val_ferias_bruto < faixa_03.max) ? +val_ferias_bruto : +faixa_03.max;

    if (val_receber_base <= +faixa_01.max)
      percentual = +faixa_01.perc;
    else if ((val_receber_base > faixa_01.max) && (val_receber_base <= faixa_02.max))
      percentual = +faixa_02.perc;
    else if (val_receber_base > faixa_02.max)
      percentual = +faixa_03.perc;

    this.percentual.inss = percentual;
    return this._pipeCalcPercent.transform(val_receber_base, percentual);
  }

  private _calculaIrrfFerias(val_ferias_receber = 0, val_um_terco_receber = 0, val_inss = 0) {
    const faixa_01 = this.IRRF[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1903.98, perc: 0, deducao: 0 }
    const faixa_02 = this.IRRF[1]; // 1: { descricao: "Faixa 02", min: 1903.98, max: 2826.65, perc: 7.5, deducao: 142.8 }
    const faixa_03 = this.IRRF[2]; // 2: { descricao: "Faixa 03", min: 2826.66, max: 3751.05, perc: 15, deducao: 354.8 }
    const faixa_04 = this.IRRF[3]; // 3: { descricao: "Faixa 04", min: 3751.06, max: 4664.68, perc: 22.5, deducao: 636.13 }
    const faixa_05 = this.IRRF[4]; // 4: { descricao: "Faixa 05", min: 4664.69, max: null, perc: 27.5, deducao: 869.36 }

    const val_total_dependentes = Number(this.valor.deducaoDependente['valor']) * (Number(this.form.get('dependentes').value) | 0);
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
    if (val_base >= faixa_05.min) {
      return this._calculoIRRF(Number(val_base), Number(faixa_05.perc), Number(faixa_05.deducao));
    } else {
      this.percentual.irrf = 0;
      return 0;
    }
  }

  private _calculoIRRF(valor_base: number, percentual: number, deducao: number) {
    this.percentual.irrf = percentual;
    const valor_bruto = this._pipeCalcPercent.transform(valor_base, percentual);
    return valor_bruto - deducao;
  }

  private _verificaFaltas() {
    const max_days = 30;
    let direito = max_days;
    const faltas = +this.form.get('diasFalta').value;
    this.datas = [...this.datasCopy];
    const datasAux = [...this.datas];

    if (faltas <= FaltasProvider.FAIXA_1.MAX)
      direito = FaltasProvider.FAIXA_1.DIREITO;
    else if (faltas > FaltasProvider.FAIXA_1.MAX && faltas <= FaltasProvider.FAIXA_2.MAX)
      direito = FaltasProvider.FAIXA_2.DIREITO;
    else if (faltas > FaltasProvider.FAIXA_2.MAX && faltas <= FaltasProvider.FAIXA_3.MAX)
      direito = FaltasProvider.FAIXA_3.DIREITO;
    else if (faltas > FaltasProvider.FAIXA_3.MAX && faltas <= FaltasProvider.FAIXA_4.MAX)
      direito = FaltasProvider.FAIXA_4.DIREITO;
    else
      direito = FaltasProvider.FAIXA_5.DIREITO;

    if (direito != 0) {
      datasAux.splice(0, 1);
      datasAux.splice(direito, max_days + 1);
    } else {
      datasAux.splice(1, max_days + 1);
    }
    this.datas = datasAux;
    this.form.get('diasFerias').setValue({ code: direito, description: `${direito}` });
  }

  onSubmit() {
    this._calcular();
    let table = document.getElementById('ct-table');
    table.classList.add('hide');
    if (this.form.invalid) {
      const errors = new ValidationMessageComponent();
      errors.errorMessageAll(this.form);
    } else {
      this._toogle = true;
      this._toogleTable();
    }
  }

  onClean() {
    this._toogle = false;
    this._toogleTable();
    this.form.reset();
    this.form.get('diasFerias').setValue('');
    this._setFocus('salario');
  }

  private _toogleTable() {
    let table = document.getElementById('ct-table');
    if (this._toogle) {
      table.classList.add('fadeIn');
      table.classList.remove('fadeOut');
    } else {
      table.classList.add('fadeOut');
      table.classList.remove('fadeIn');
    }
  }

  private _setFocus(id: string) {
    document.getElementById(id).focus();
  }
}
