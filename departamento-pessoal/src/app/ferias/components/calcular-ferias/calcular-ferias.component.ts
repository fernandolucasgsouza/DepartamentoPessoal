import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as s from '../../services';
import * as fc from '../../../core/format-datas';


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

    console.log(parseFloat(fc.FormatDatas.formatForFloat("1.200,03")));
  }

  public calcular(): void {

    debugger;

    let salario = fc.FormatDatas.formatForFloat(this.formCalculaFerias.get('salario').value);
      // let salario = parseFloat(
      //   fc.FormatDatas.formatForFloat(this.formCalculaFerias.get('salario').value));
    let horasExtras = parseFloat(
      fc.FormatDatas.formatForFloat(this.formCalculaFerias.get('horasExtras').value));
    let diasFerias = parseInt(
      fc.FormatDatas.formatForFloat(this.formCalculaFerias.get('dias').value));

    let valorBrutoFerias = this._service.calculaFerias(salario, horasExtras, diasFerias)
    let valor1_3 = this._service.calculaFerias1_3(valorBrutoFerias);

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: 'R$' + valorBrutoFerias,
      descontos: '-'
    };

    this.itemFerias1_3 = {
      ref: '-',
      proventos: 'R$' + valor1_3,
      descontos: '-'
    }

    this._service.calculaInss(valorBrutoFerias);
  }

  public clean() {
    this.itemFerias = { ref: '-', proventos: '-', descontos: '-' };
    this.itemFerias1_3 = { ref: '-', proventos: '-', descontos: '-' };
  }
}
