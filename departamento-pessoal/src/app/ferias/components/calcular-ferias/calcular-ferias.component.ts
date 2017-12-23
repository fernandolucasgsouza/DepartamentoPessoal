import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as s from '../../services';
import * as sc from '../../../core/services';



@Component({
  selector: 'app-calcular-ferias',
  templateUrl: './calcular-ferias.component.html',
  styleUrls: ['./calcular-ferias.component.css']
})
export class CalcularFeriasComponent implements OnInit {

  public itemFerias: object = { ref: '-', proventos: '-',descontos: '-'  };
  public itemFerias1_3: object = { ref: '-', proventos: '-',descontos: '-' };
  public itemInss: object = { ref: '-',  proventos: '-', descontos: '-'  };
  public itemIrrf: object = {  ref: '-', proventos: '-', descontos: '-' };
  public formCalculaFerias: FormGroup;

  public fbGroup = {
    salario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])),
    dias: new FormControl('', Validators.compose([
      Validators.required, 
      Validators.min(5),
      Validators.max(30),
    ])),
    horasExtras: new FormControl('', Validators.compose([Validators.required])),
    faltas: new FormControl('', Validators.compose([Validators.required])),
    dependentes: new FormControl('', Validators.compose([Validators.required])),
  };

  constructor(
    private _fb: FormBuilder,
    private _service: s.FeriasService
  ) {
    this.formCalculaFerias = this._fb.group(this.fbGroup);
  }

  ngOnInit() {
  }

  public calcular(): void {

    let salario = parseFloat(sc.FormatDatasService.formatForFloat(
      this.formCalculaFerias.get('salario').value)) * 10;
    let horasExtras = parseFloat(sc.FormatDatasService.formatForFloat(
      this.formCalculaFerias.get('horasExtras').value)) * 10;
    let diasFerias = parseInt(this.formCalculaFerias.get('dias').value);
    let totDependentes = parseInt(this.formCalculaFerias.get('dependentes').value);

    let valorBrutoFerias = this._service.calculaFerias(salario, horasExtras, diasFerias);
    let valor1_3 = this._service.calculaFerias1_3(valorBrutoFerias);
    let valorInss = this._service.calculaINSS(valorBrutoFerias,valor1_3);

    let valorIrrf = this._service.calculaIRRF(valorBrutoFerias,valor1_3,valorInss,totDependentes);

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: sc.FormatDatasService.formatForFloatReverse(String(valorBrutoFerias.toFixed(2))),
      descontos: '-'
    };
    this.itemFerias1_3 = {
      ref: '1/3',
      proventos: sc.FormatDatasService.formatForFloatReverse(String(valor1_3.toFixed(2))),
    };
    this.itemInss = {
      ref: this._service.percentual_INSS + '%',
      proventos: sc.FormatDatasService.formatForFloatReverse(String(valorInss.toFixed(2))),
      descontos: '-'
    };
    this.itemIrrf = {
      ref: this._service.percentual_IRRF + '%',
      proventos: sc.FormatDatasService.formatForFloatReverse(String(valorIrrf.toFixed(2))),
      descontos: '-'
    };

  }

  public clean() {
    this.itemFerias = { ref: '-', proventos: '-', descontos: '-' };
    this.itemFerias1_3 = { ref: '-', proventos: '-', descontos: '-' };
  }
}
