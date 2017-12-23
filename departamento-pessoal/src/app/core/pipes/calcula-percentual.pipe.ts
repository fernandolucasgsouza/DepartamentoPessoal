import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculaPercentual'
})
export class CalculaPercentualPipe implements PipeTransform {

  transform(valor: number, percentual: number): number {
    return (valor * percentual) / 100;
  }

}
