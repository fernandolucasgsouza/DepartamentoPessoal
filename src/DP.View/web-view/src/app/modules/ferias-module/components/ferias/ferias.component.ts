import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidationMessageComponent } from 'src/app/shared/components/validation-message/validation-message.component';

@Component({
  selector: 'fs-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  form: FormGroup;
  fbGroup = {
    salario: ['', [Validators.required]],
    horasExtras: ['',],
    diasFalta: ['', [Validators.required]],
    diasFerias: ['', [Validators.required, Validators.max(30)]],
    dependentes: ['', [Validators.required]]
  }
  constructor(private _fb: FormBuilder) {
    this.form = _fb.group(this.fbGroup)
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit');

    debugger
    if (this.form.invalid) {
      const errors = new ValidationMessageComponent();
      errors.errorMessageAll(this.form);
    }
  }

  teste(e) {
    console.log(e);

    console.log(this.form.get('salario').invalid);

  }
}
