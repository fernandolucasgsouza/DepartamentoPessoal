import { Pipe, PipeTransform, style } from '@angular/core';

@Pipe({
  name: 'formatCurrency'
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: any, currency = 'BRL'): any {
    /**
     * injetar o código da moeda no html
     * <div>{{(itemIrrf.descontos | formatCurrency:'EUR')}}</div>
     * 'BRL' default
     */
    let locale = '';
    switch (currency) {
      case 'EUR':
        locale = 'de-DE';
        break;
        case 'JPY':
        locale = 'ja-JP';
        break;
      default:
        locale = 'pt-BR';
        break;
    }

    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value);
  }
}
