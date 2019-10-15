import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculaPercentual'
})
export class CalculaPercentualPipe implements PipeTransform {

  transform(value: number, percent: number): number {
    return (value * percent) / 100;
  }

}
