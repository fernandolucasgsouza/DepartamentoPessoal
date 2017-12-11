import { Injectable } from '@angular/core';

@Injectable()
export class FeriasService {

  constructor() { }

  public calculaSalarioBruto(salario:string, horasExtras:string):void{

    let result = parseFloat(salario) + parseFloat(horasExtras);
  }

}
