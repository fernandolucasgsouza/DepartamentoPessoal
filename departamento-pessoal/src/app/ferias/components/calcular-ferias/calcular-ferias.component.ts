import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as s from '../../services';
import * as fc from '../../../core/format-datas';
import { stringify } from '@angular/core/src/util';


@Component({
  selector: 'app-calcular-ferias',
  templateUrl: './calcular-ferias.component.html',
  styleUrls: ['./calcular-ferias.component.css']
})
export class CalcularFeriasComponent implements OnInit {

  public itemFerias: object;
  public itemFerias1_3: object;
  public formCalculaFerias: FormGroup;

  public fbGroup = {
    salario: new FormControl('', Validators.required),
    horasExtras: new FormControl('', Validators.required),
    dias: new FormControl('', Validators.required),
    dependentes: new FormControl('', Validators.required),
  };

  constructor(
    private _fb: FormBuilder,
    private _service: s.FeriasService
  ) {
    this.formCalculaFerias = this._fb.group(this.fbGroup);
    this.itemFerias = { ref: '-', proventos: '-', descontos: '-' };
    this.itemFerias1_3 = { ref: '-', proventos: '-', descontos: '-' };
  }

  ngOnInit() {
  }

  public calcular(): void {

    const salario = parseFloat(fc.FormatDatas.formatForFloat(
      this.formCalculaFerias.get('salario').value)) * 10;
    const horasExtras = parseFloat(fc.FormatDatas.formatForFloat(
      this.formCalculaFerias.get('horasExtras').value)) * 10;
    const diasFerias = parseInt(this.formCalculaFerias.get('dias').value);

    const valorBrutoFerias = this._service.calculaFerias(salario, horasExtras, diasFerias);
    const valor1_3 = this._service.calculaFerias1_3(valorBrutoFerias);

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: fc.FormatDatas.formatForFloatReverse(valorBrutoFerias.toFixed(2) + ''),
      descontos: '-'
    };

    this.itemFerias1_3 = {
      ref: '-',
      proventos: fc.FormatDatas.formatForFloatReverse(valor1_3.toFixed(2) + ''),
      descontos: '-'
    };

    this._service.calculaInss(valorBrutoFerias);
  }

  public clean() {
    this.itemFerias = { ref: '-', proventos: '-', descontos: '-' };
    this.itemFerias1_3 = { ref: '-', proventos: '-', descontos: '-' };
  }
}
