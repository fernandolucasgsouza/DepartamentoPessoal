import { Component, OnInit, HostListener, ViewContainerRef, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import * as sc from '../../../core/services';
import * as cc from '../../../core/components';
import * as s from '../../services';


@Component({
  selector: 'app-calcular-ferias',
  templateUrl: './calcular-ferias.component.html',
  styleUrls: ['./calcular-ferias.component.css']
})
export class CalcularFeriasComponent implements OnInit, OnChanges {

  public modal_Inss: any;

  public formCalculaFerias: FormGroup;
  public itemFerias: object = { ref: '-', proventos: '-', descontos: '-' };
  public itemFerias1_3: object = { ref: '-', proventos: '-', descontos: '-' };
  public itemInss: object = { ref: '-', proventos: '-', descontos: '-' };
  public itemIrrf: object = { ref: '-', proventos: '-', descontos: '-' };
  public itemSubTotais: object = { ref: '-', proventos: '-', descontos: '-' };
  public vrTotal: any = '-';
  public faltas: any;
  public btnStatus: boolean = false;

  public fbGroup = {
    salario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.minLength(6)
    ])),
    horasExtras: new FormControl('0,00', Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.minLength(3)
    ])),
    faltas: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)
    ])),
    dias: new FormControl(
      { value: '', disabled: true },
      Validators.compose([
        Validators.required,
        Validators.min(5),
        Validators.max(30),
      ])
    ),
    dependentes: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)
    ])),
  };


  constructor(
    private _fb: FormBuilder,
    private _service: s.FeriasService,
  ) {
    this.formCalculaFerias = this._fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.modal_Inss = cc.TabelaInssComponent;
  }

  ngOnChanges(): void { }

  public calcular(): void {
    console.log(this.formCalculaFerias.controls.dependentes.value)

    let salario = parseFloat(sc.FormatDatasService.formatForFloat(
      this.formCalculaFerias.get('salario').value)) * 10;

    let horasExtras = parseFloat(sc.FormatDatasService.formatForFloat(
      this.formCalculaFerias.get('horasExtras').value)) * 10;

    let diasFerias = parseInt(this.formCalculaFerias.get('dias').value);
    let totDependentes = parseInt(this.formCalculaFerias.get('dependentes').value);

    let valorBrutoFerias = this._service.calculaFerias(salario, horasExtras, diasFerias);
    let provFerias = sc.FormatDatasService.formatForFloatReverse(
      String(valorBrutoFerias.toFixed(2)));

    let valor1_3 = this._service.calculaFerias1_3(valorBrutoFerias);
    let provFerias1_3 = sc.FormatDatasService.formatForFloatReverse(
      String(valor1_3.toFixed(2)));

    let valorInss = this._service.calculaINSS(valorBrutoFerias, valor1_3);
    let descInss = sc.FormatDatasService.formatForFloatReverse(
      String(valorInss.toFixed(2)));

    let valorIrrf = this._service.calculaIRRF(valorBrutoFerias, valor1_3, valorInss, totDependentes);
    let descIrrf = sc.FormatDatasService.formatForFloatReverse(
      String(valorIrrf.toFixed(2)));

    let somaProv = this._service.somaSubtotal(valorBrutoFerias, valor1_3);
    let subtotalProv = sc.FormatDatasService.formatForFloatReverse(
      String(somaProv.toFixed(2)));

    let somaDesc = this._service.somaSubtotal(valorInss, valorIrrf);
    let subtotalDesc = sc.FormatDatasService.formatForFloatReverse(
      String(somaDesc.toFixed(2)));

    let total = this._service.calcTotal(somaProv, somaDesc);
    this.vrTotal = sc.FormatDatasService.formatForFloatReverse(
      String(total.toFixed(2)));

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: provFerias,
      descontos: '-'
    };
    this.itemFerias1_3 = {
      ref: '1/3',
      proventos: provFerias1_3,
      descontos: '-'
    };
    this.itemInss = {
      ref: this._service.percentual_INSS + '%',
      proventos: '-',
      descontos: descInss
    };
    this.itemIrrf = {
      ref: this._service.percentual_IRRF + '%',
      proventos: '-',
      descontos: descIrrf
    };
    this.itemSubTotais = {
      ref: '-',
      proventos: subtotalProv,
      descontos: subtotalDesc
    };

    /**
     * apresenta valor total
     */
    this.fadeIn('fs-container-total');
  }

  onKeyFalta(event: any) {
    let vrInput = event.target.value;
    this.btnStatus = false;

    if (vrInput != undefined && vrInput != null && vrInput != '') {
      this.formCalculaFerias.get('dias').clearValidators();
      this.formCalculaFerias.get('dias').enable();
      this.faltas = this._service.verificaFaltas(parseInt(vrInput));
      this.formCalculaFerias.get('dias').setValue(this.faltas);
      this.formCalculaFerias.get('dias').setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.min(5),
        Validators.max(this.faltas)
      ]);

      if (this.faltas == 0) {
        this.formCalculaFerias.get('dias').disable();
        this.btnStatus = true;
        return
      }
    }
    else {
      this.formCalculaFerias.get('dias').disable();
      this.formCalculaFerias.get('dias').setValue('');
    }
  }

  public clean() {
    let itensTable = [
      this.itemFerias,
      this.itemFerias1_3,
      this.itemInss,
      this.itemIrrf,
      this.itemSubTotais];

    /**
    * reseta campos tabela [ref, proventos, descontos]
    */
    for (let i = 0; i < itensTable.length; i++) {
      for (let key in itensTable[i]) {
        itensTable[i][key] = '-';
      }
    }

    /**
     * reseta campos formulário inputs
     */
    for (let key in this.fbGroup) {
      if (key == 'horasExtras') {
        this.fbGroup[key].reset('0,00');
      } else if (key == 'faltas' || key == 'dependentes') {
        this.fbGroup[key].reset('00');
      } else {
        this.fbGroup[key].reset();
      }

    }
    this.setFocus('salario');
    this.fadeOut('fs-container-total');
    this.formCalculaFerias.get('dias').disable();
  }

  public fadeIn(itemId: string) {
    let item = document.getElementById(itemId);
    item.classList.remove('fs-fade-out');
    item.classList.add('fs-fade-in');
  }

  public fadeOut(itemId: string) {
    let item = document.getElementById(itemId);
    item.classList.remove('fs-fade-in');
    item.classList.add('fs-fade-out');
  }

  public setFocus(itemId: any) {
    let item = document.getElementById(itemId).focus();
  }
}
