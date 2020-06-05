import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ICodeDescription } from 'src/app/core/interfaces/code-description.interface';
import { ImpostosService } from 'src/app/core/services';
import { CalculaPercentualPipe } from 'src/app/shared/pipes/calcula-percentual/calcula-percentual.pipe';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';
import { FaultsVacation } from 'src/app/core/enums';
import { ITaxes } from 'src/app/core/interfaces';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  public days: Array<ICodeDescription> = [];
  public percentage = { inss: 0, irrf: 0 };
  public faultsStatus = FaultsVacation;

  public form: FormGroup;
  public fbGroup = {
    salario: ['', [Validators.required, Validators.maxLength(8), Validators.max(25000)]],
    horasExtras: ['', Validators.required],
    diasFalta: ['', [Validators.required, Validators.max(this.faultsStatus.faultsFive)]],
    diasFerias: ['', [Validators.required, Validators.max(30)]],
    dependentes: ['', [Validators.required, Validators.max(10)]],
  };

  public modal = {
    inss: null, irrf: null,
  };

  private inssList: Array<ITaxes> = [];
  private irrfList: Array<ITaxes> = [];
  private toogle: boolean;

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


  constructor(
    private fb: FormBuilder,
    private serviceImpostos: ImpostosService,
    private pipeCalcPercent: CalculaPercentualPipe
  ) {
    this.form = fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.serviceImpostos.getDepente().subscribe(res => this.valor.deducaoDependente = res[0]);
    this.createMonthDaysSelect(30);
    this.getInss();
    this.getIrrf();
    console.log(this.inssList);
  }

  public createMonthDaysSelect(days: number) {
    const month = [];
    for (let i = 0; i <= days; i++) {
      month.push({ code: i, description: `${i}` });
    }
    this.days = month;
  }

  private getInss() {
    this.serviceImpostos.getInss()
      .subscribe(datas => {
        this.inssList = datas;
        this.serviceImpostos.Inss.next(datas);
        console.log(this.inssList);
      });
  }

  private getIrrf() {
    this.serviceImpostos.getIrrf()
      .subscribe(datas => {
        this.irrfList = datas;
        this.serviceImpostos.Irrf.next(datas);
        console.log(this.irrfList);
      });
  }

  changeField(value: string | number, controlName: string) {
    if (controlName.toString() === 'diasFalta') { this.vacationDays(+value); }
  }

  private calcMain() {

    this.valor.ferias = this.calcVacation();
    this.valor.umTercoFerias = (this.valor.ferias / 3);
    this.valor.inss = this.calcInss();
    console.log(this.valor.inss);

    this.valor.irrf = this.calcIrrf();
    this.valor.subTotProventos = (this.valor.ferias || 0) + (this.valor.umTercoFerias || 0);
    this.valor.subTotDescontos = (this.valor.inss || 0) + (this.valor.irrf || 0);
    this.valor.total = this.valor.subTotProventos - this.valor.subTotDescontos;

  }

  private calcVacation() {
    const diasFerias = this.form.get('diasFerias').value.code || 0;
    const salario = this.form.get('salario').value || 0;
    const horasExtras = this.form.get('horasExtras').value || 0;
    return Number(diasFerias) * ((Number(salario) + Number(horasExtras)) / 30);
  }

  /**
   * inssList[0] = faixa 01
   * inssList[1] = faixa 02
   * inssList[2] = faixa 03
   */
  private calcInss() {

    const vacationValueTotal = this.valueVacationBase();

    if (vacationValueTotal > +this.inssList[2].maximum) {
      this.percentage.inss = +this.inssList[2].percentage;
      return this.pipeCalcPercent.transform(+this.inssList[2].maximum, this.percentage.inss);
    }

    if (vacationValueTotal <= +this.inssList[0].maximum) {
      this.percentage.inss = +this.inssList[0].percentage;
    } else if ((vacationValueTotal > +this.inssList[0].maximum) && (vacationValueTotal <= +this.inssList[1].maximum)) {
      this.percentage.inss = +this.inssList[1].percentage;
    } else {
      this.percentage.inss = +this.inssList[2].percentage;

    }
    return this.pipeCalcPercent.transform(vacationValueTotal, this.percentage.inss);

  }

  private calcIrrf() {

    const valueBase = this.valueIrrfBase();

    if (valueBase < this.irrfList[0].maximum) {
      this.percentage.irrf = 0;
      return 0;
    }

    if ((valueBase > this.irrfList[0].maximum) && (valueBase <= this.irrfList[1].maximum)) {
      return this.calculationIrrf(+valueBase, +this.irrfList[1].percentage, +this.irrfList[1].deduction);
    }
    if ((valueBase > this.irrfList[1].maximum) && (valueBase <= this.irrfList[2].maximum)) {
      return this.calculationIrrf(+valueBase, +this.irrfList[2].percentage, +this.irrfList[2].deduction);
    }
    if ((valueBase > this.irrfList[2].maximum) && (valueBase <= this.irrfList[3].maximum)) {
      return this.calculationIrrf(+valueBase, +this.irrfList[3].percentage, +this.irrfList[3].deduction);
    }
    if (valueBase >= this.irrfList[4].minimum) {
      return this.calculationIrrf(+valueBase, +this.irrfList[4].percentage, +this.irrfList[4].deduction);
    }

  }

  private calculationIrrf(valueBase: number, percentage: number, deducao: number) {
    this.percentage.irrf = percentage;
    const valorBruto = this.pipeCalcPercent.transform(valueBase, percentage);
    return valorBruto - deducao;
  }

  public valueVacationBase(): number {
    return Number(this.valor.ferias) + Number(this.valor.umTercoFerias);
  }

  public valueIrrfBase(): number {
    const valueInss = this.calcInss();
    const valueVacation = this.valueVacationBase();
    // tslint:disable-next-line:no-string-literal
    const valueDependent = Number(this.valor.deducaoDependente['valor']) * (Number(this.form.get('dependentes').value) || 0);
    return valueVacation - (valueInss + valueDependent);
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
    this.calcMain();
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
