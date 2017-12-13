import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[mask]'
})

export class MaskDirective implements AfterViewInit {
  @Input('mask') mask: string;
  @Input() maskReverse: string = 'false';

  constructor(private elRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    $(this.elRef.nativeElement).mask(this.mask, { reverse: (this.maskReverse == 'true') ? true : false });
  }
}
