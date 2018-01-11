import { Directive,ElementRef,HostListener } from '@angular/core';

import * as pc from '../../../pipes';

@Directive({
  selector: '[fsMaskDecimal]'
})
export class MaskDecimalDirective {

  constructor(private elRef:ElementRef, private pipe: pc.FormatCurrencyPipe) { }

  @HostListener('keyup',['$event'])
  onKeyup(event:any){
        let val = event.target.value;

        let p = this.pipe.transform(val)


        // let p  =  new Intl.NumberFormat('de-DE').format(val);

    console.log(val, typeof(val), " - ", p)
  }

}
