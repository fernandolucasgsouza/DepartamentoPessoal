import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ICodeDescription } from 'src/app/core/interfaces/code-description.interface';
import { ImpostosService } from 'src/app/core/services';
import { InssModel, IrrfModel } from 'src/app/core/models';
import { CalculaPercentualPipe } from 'src/app/shared/pipes/calcula-percentual/calcula-percentual.pipe';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { FaltasEnum } from 'src/app/core/providers/business/faltas.enum';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  private faultsStatus = FaltasEnum;
  private toogle: boolean;
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
  };
  days: Array<ICodeDescription> = [];
  INSS: InssModel[] = [];
  IRRF: IrrfModel[] = [];
  form: FormGroup;
  fbGroup = {
    salario: ['', [Validators.required, Validators.maxLength(8), Validators.max(25000)]],
    horasExtras: ['', Validators.required],
    diasFalta: ['', [Validators.required, Validators.max(this.faultsStatus.faultsFive)]],
    diasFerias: ['', [Validators.required, Validators.max(30)]],
    dependentes: ['', [Validators.required, Validators.max(10)]],
  };

  public modal = {
    inss: null,
    irrf: null
  };

  constructor(
    private fb: FormBuilder,
    private serviceImpostos: ImpostosService,
    private pipeCalcPercent: CalculaPercentualPipe
  ) {
    this.form = fb.group(this.fbGroup);
    this.serviceImpostos.Inss$.subscribe(res => { this.INSS = res; console.log(this.INSS); });
    this.serviceImpostos.Irrf$.subscribe(res => { this.IRRF = res; console.log(this.IRRF); });
  }

  ngOnInit() {
    this.serviceImpostos.getInss().subscribe(res => this.serviceImpostos.Inss.next(res));
    this.serviceImpostos.getIRRF().subscribe(res => this.serviceImpostos.Irrf.next(res));
    this.serviceImpostos.getDepente().subscribe(res => this.valor.deducaoDependente = res[0]);
    this.createMonthDaysSelect(30);
  }

  public createMonthDaysSelect(days: number) {
    const month = [];
    for (let i = 0; i <= days; i++) {
      month.push({ code: i, description: `${i}` });
    }
    this.days = month;
  }

  changeField(value: string | number, controlName: string) {
    if (controlName.toString() === 'diasFalta') { this.vacationDays(+value); }
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
    const diasFerias = this.form.get('diasFerias').value.code || 0;
    const salario = this.form.get('salario').value || 0;
    const horasExtras = this.form.get('horasExtras').value || 0;
    return Number(diasFerias) * ((Number(salario) + Number(horasExtras)) / 30);
  }

  private _calculaInssFerias(valorFeriasReceber = 0, umTercoReceber = 0) {
    let percentual = 0;
    const faixa01 = this.INSS[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1659.38, perc: 8 }
    const faixa02 = this.INSS[1]; // 1: { descricao: "Faixa 02", min: 1659.39, max: 2765.66, perc: 9 }
    const faixa03 = this.INSS[2]; // 2: { descricao: "Faixa 03", min: 2765.67, max: 5531.31, perc: 11 }

    const valFeriasBruto = valorFeriasReceber + umTercoReceber;
    const valReceberBase = (+valFeriasBruto < faixa03.max) ? +valFeriasBruto : +faixa03.max;

    if (valReceberBase <= +faixa01.max) {
      percentual = +faixa01.perc;
    } else if ((valReceberBase > faixa01.max) && (valReceberBase <= faixa02.max)) {
      percentual = +faixa02.perc;
    } else if (valReceberBase > faixa02.max) {
      percentual = +faixa03.perc;
    }
    this.percentual.inss = percentual;
    return this.pipeCalcPercent.transform(valReceberBase, percentual);
  }

  private _calculaIrrfFerias(valFeriasReceber = 0, valUmTercoReceber = 0, valInss = 0) {
    const faixa01 = this.IRRF[0]; // 0: { descricao: "Faixa 01", min: 0, max: 1903.98, perc: 0, deducao: 0 }
    const faixa02 = this.IRRF[1]; // 1: { descricao: "Faixa 02", min: 1903.98, max: 2826.65, perc: 7.5, deducao: 142.8 }
    const faixa03 = this.IRRF[2]; // 2: { descricao: "Faixa 03", min: 2826.66, max: 3751.05, perc: 15, deducao: 354.8 }
    const faixa04 = this.IRRF[3]; // 3: { descricao: "Faixa 04", min: 3751.06, max: 4664.68, perc: 22.5, deducao: 636.13 }
    const faixa05 = this.IRRF[4]; // 4: { descricao: "Faixa 05", min: 4664.69, max: null, perc: 27.5, deducao: 869.36 }

    // tslint:disable-next-line:no-string-literal
    const valorTotalDependentes = Number(this.valor.deducaoDependente['valor']) * (Number(this.form.get('dependentes').value) || 0);
    const valorBase = (valFeriasReceber + valUmTercoReceber) - (valInss + valorTotalDependentes);

    if ((valorBase > faixa01.max) && (valorBase <= faixa02.max)) {
      return this._calculoIRRF(Number(valorBase), Number(faixa02.perc), Number(faixa02.deducao));
    }
    if ((valorBase > faixa02.max) && (valorBase <= faixa03.max)) {
      return this._calculoIRRF(Number(valorBase), Number(faixa03.perc), Number(faixa03.deducao));
    }
    if ((valorBase > faixa03.max) && (valorBase <= faixa04.max)) {
      return this._calculoIRRF(Number(valorBase), Number(faixa04.perc), Number(faixa04.deducao));
    }
    if (valorBase >= faixa05.min) {
      return this._calculoIRRF(Number(valorBase), Number(faixa05.perc), Number(faixa05.deducao));
    } else {
      this.percentual.irrf = 0;
      return 0;
    }
  }

  private _calculoIRRF(valorBase: number, percentual: number, deducao: number) {
    this.percentual.irrf = percentual;
    const valorBruto = this.pipeCalcPercent.transform(valorBase, percentual);
    return valorBruto - deducao;
  }

  private vacationDays(faults: number) {
    let vacationDays = 0;

    if (faults <= this.faultsStatus.faultsOne) {
      vacationDays = this.faultsStatus.vacationDaysOne;
    } else if (faults > this.faultsStatus.faultsOne && faults <= this.faultsStatus.faultsTwo) {
      vacationDays = this.faultsStatus.vacationDaysTwo;
    } else if (faults > this.faultsStatus.faultsTwo && faults <= this.faultsStatus.faultsThree) {
      vacationDays = this.faultsStatus.vacationDaysThree;
    } else if (faults > this.faultsStatus.faultsThree && faults <= this.faultsStatus.faultsFour) {
      vacationDays = this.faultsStatus.vacationDaysFour;
    } else {
      vacationDays = this.faultsStatus.vacationDaysFive;
    }
    this.createMonthDaysSelect(vacationDays);
    this.form.get('diasFerias').setValue({ code: vacationDays, description: `${vacationDays}` });

  }

  onSubmit() {
    this._calcular();
    const table = document.getElementById('ct-table');
    table.classList.add('hide');
    if (this.form.invalid) {
      const errors = new ValidationMessageComponent();
      errors.errorMessageAll(this.form);
    } else {
      this.toogle = true;
      this.toogleTable();
    }
  }

  onClean() {
    this.toogle = false;
    this.toogleTable();
    this.form.reset();
    this.form.get('diasFerias').setValue('');
    this._setFocus('salario');
  }

  private toogleTable() {
    const table = document.getElementById('ct-table');
    if (this.toogle) {
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
