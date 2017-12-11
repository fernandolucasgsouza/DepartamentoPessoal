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
  public formCalculaFerias: FormGroup;

  public fbGroup = {
    salario : new FormControl('', Validators.required),
    horasExtras : new FormControl('', Validators.required),
    dias : new FormControl('', Validators.required),
    dependentes : new FormControl('', Validators.required),
  };

  constructor(
    private _fb: FormBuilder,
    private _service : s.FeriasService
  ) {
    this.formCalculaFerias = this._fb.group(this.fbGroup);
    console.log(this.formCalculaFerias.controls);
    this.itemFerias = {
      ref: '-',
      proventos : '-',
      descontos : '-'
    };
  }

  ngOnInit() {
    this.calcular();
  }


  public calcular(): void {

    let salario = this.formCalculaFerias.get('salario').value;
    let horasExtras = this.formCalculaFerias.get('horaExtras').value

    this.itemFerias = {
      ref: '-',
      proventos : this._service.calculaSalarioBruto(salario, horasExtras),
      descontos : '-'
    };

  }

}
