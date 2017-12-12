import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as s from '../../services';

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

    let salario = parseFloat(this.formCalculaFerias.get('salario').value);
    let horasExtras = parseFloat(this.formCalculaFerias.get('horasExtras').value);
    let diasFerias = parseInt(this.formCalculaFerias.get('dias').value);

    let valorFeriasBruto = this._service.calculaFerias(salario, horasExtras, diasFerias)
    let valor1_3 = this._service.calcularFerias1_3(valorFeriasBruto);

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: 'R$' + valorFeriasBruto,
      descontos: '-'
    };

    this.itemFerias1_3 = {
      ref: '-',
      proventos: 'R$' + valor1_3,
      descontos: '-'
    }
  }

  public clean() {
    this.itemFerias = { ref: '-', proventos: '-', descontos: '-' };
    this.itemFerias1_3 = { ref: '-', proventos: '-', descontos: '-' };
  }
}
