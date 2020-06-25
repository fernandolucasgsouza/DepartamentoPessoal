import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ITaxes } from 'src/app/core/interfaces';
import { FaultsVacation } from 'src/app/core/enums';
import { ImpostosService } from 'src/app/core/services';
import { ValuesVacationModel } from 'src/app/core/models/values-vacation.model';
import { ICodeDescription } from 'src/app/core/interfaces/code-description.interface';
import { CalculaPercentualPipe } from 'src/app/shared/pipes/calcula-percentual/calcula-percentual.pipe';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  public days: Array<ICodeDescription> = [];
  public percentage = { inss: 0, irrf: 0 };
  public faultsStatus = FaultsVacation;
  public values: ValuesVacationModel = new ValuesVacationModel();

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


  constructor(
    private fb: FormBuilder,
    private serviceImpostos: ImpostosService,
    private pipeCalcPercent: CalculaPercentualPipe
  ) {
    this.form = fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.getDepentes();
    this.createMonthDaysSelect(30);
    this.getInss();
    this.getIrrf();
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
      .subscribe((resp: ITaxes[]) => {
        this.inssList = resp;
        this.serviceImpostos.taxesInss.next(this.inssList);
      });
  }

  private getIrrf() {
    this.serviceImpostos.getIrrf()
      .subscribe((resp: ITaxes[]) => {
        this.irrfList = resp;
        this.serviceImpostos.taxesIrrf.next(this.irrfList);
      });
  }

  private getDepentes() {
    this.serviceImpostos.getDepente()
      .subscribe(res => this.values.deducaoDependente = res[0].valor);
  }

  changeField(value: string | number, controlName: string) {
    if (controlName.toString() === 'diasFalta') { this.vacationDays(+value); }
  }

  private calcMain() {

    this.values.ferias = this.calcVacation();
    this.values.feriasUmTerco = (this.values.ferias / 3);
    this.values.inss = this.calcInss();
    console.log(this.values.inss);

    this.values.irrf = this.getValueIrrf();
    this.values.subTotalProventos = (this.values.ferias || 0) + (this.values.feriasUmTerco || 0);
    this.values.subTotalDescontos = (this.values.inss || 0) + (this.values.irrf || 0);
    this.values.total = this.values.subTotalProventos - this.values.subTotalDescontos;

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
    const inss = this.inssList[this.irrfList.length - 1].datas;

    if (vacationValueTotal > +inss[2].maximum) {
      this.percentage.inss = +inss[2].percentage;
      return this.pipeCalcPercent.transform(+inss[2].maximum, this.percentage.inss);
    }

    if (vacationValueTotal <= +inss[0].maximum) {
      this.percentage.inss = +inss[0].percentage;
    } else if ((vacationValueTotal > +inss[0].maximum) && (vacationValueTotal <= +inss[1].maximum)) {
      this.percentage.inss = +inss[1].percentage;
    } else {
      this.percentage.inss = +inss[2].percentage;
    }
    return this.pipeCalcPercent.transform(vacationValueTotal, this.percentage.inss);

  }

  private getValueIrrf() {

    const valueBase = this.valueIrrfBase();
    const irrf = this.irrfList[this.irrfList.length - 1].datas;

    if (valueBase < irrf[0].maximum) {
      this.percentage.irrf = 0;
      return 0;
    }

    if ((valueBase > irrf[0].maximum) && (valueBase <= irrf[1].maximum)) {
      return this.calcIrrf(+valueBase, +irrf[1].percentage, +irrf[1].deduction);
    }
    if ((valueBase > irrf[1].maximum) && (valueBase <= irrf[2].maximum)) {
      return this.calcIrrf(+valueBase, +irrf[2].percentage, +irrf[2].deduction);
    }
    if ((valueBase > irrf[2].maximum) && (valueBase <= irrf[3].maximum)) {
      return this.calcIrrf(+valueBase, +irrf[3].percentage, +irrf[3].deduction);
    }
    if (valueBase >= irrf[4].minimum) {
      return this.calcIrrf(+valueBase, +irrf[4].percentage, +irrf[4].deduction);
    }

  }

  private calcIrrf(valueBase: number, percentage: number, deducao: number) {
    this.percentage.irrf = percentage;
    const valorBruto = this.pipeCalcPercent.transform(valueBase, percentage);
    return valorBruto - deducao;
  }

  private valueVacationBase(): number {
    return Number(this.values.ferias) + Number(this.values.feriasUmTerco);
  }

  private valueIrrfBase(): number {
    const valueInss = this.calcInss();
    const valueVacation = this.valueVacationBase();
    const valueDependent = Number(this.values.deducaoDependente) * (Number(this.form.get('dependentes').value) || 0);
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
