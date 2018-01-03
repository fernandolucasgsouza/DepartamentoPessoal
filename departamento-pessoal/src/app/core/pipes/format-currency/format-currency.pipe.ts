import { Pipe, PipeTransform, style } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: any, locale = 'pt-BR', currency = 'BRL'): any {

    /*let currency = '';
    switch (locale) {
      case 'de-DE':
        currency = 'EUR';
        break;
        case 'ja-JP':
        currency = 'JPY';
        break;
      default:
        currency = 'BRL';
        break;
    }*/

    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
  }

  // transform(value: any, args ?:any): any {
  //   return new Intl.NumberFormat('de-DE', {style: 'currency', currency : 'EUR'}).format(value);
  // }

}
