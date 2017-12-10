import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-calcular-ferias',
  templateUrl: './calcular-ferias.component.html',
  styleUrls: ['./calcular-ferias.component.css']
})
export class CalcularFeriasComponent implements OnInit {

  public itemFerias: object;
  public formCalculaFerias: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) {
    this.formCalculaFerias = this._fb.group({
      salario: ['100', Validators.compose(
        [Validators.required, Validators.minLength(4)])
      ]
    });
  }

  ngOnInit() {
  }


  public calcular(): void {

    this.itemFerias = {
      ref: '-',
      proventos : '0,00',
      descontos : '-'
    };

  }

}
