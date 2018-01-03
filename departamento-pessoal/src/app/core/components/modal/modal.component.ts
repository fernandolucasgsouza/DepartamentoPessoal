import {
  Component, OnInit, Input, ComponentRef, ViewContainerRef, ViewChild,
  ComponentFactoryResolver
} from '@angular/core';

import { ModalAnimations } from './modal.amination';
import { TabelaInssComponent, TabelaIrrfComponent } from '../index';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [ModalAnimations]
})

export class ModalComponent implements OnInit {

  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;
  @Input() bgColorClassSection: string;
  @Input() bgColorClassContainer: string;
  @Input() title: string;
  @Input() description: string;
  @Input() modalContent: any;
  @Input() idModal: any;


  private _componentRef: ComponentRef<any>;
  public innerHtmlContent: any;
  public visibility: string = 'hidden';
  public modalCurrent;

  constructor(private _componetFR: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this._buildModal()
  }

  private _buildModal() {
    switch (typeof this.modalContent) {
      case 'function':
        this.createComponent();
        break;
      case 'string':
        this.addToComponent();
        break;

    }
  }

  private createComponent() {
    this.parent.clear();
    let factory = this._componetFR.resolveComponentFactory(this.modalContent);
    this._componentRef = this.parent.createComponent(factory);
  }

  private _modalContent(){

  }
  private addToComponent() {
    this.innerHtmlContent = this.modalContent;
  }
  
  public openModal() {
    this.visibility = 'shown';
  }

  public closeModal() {
    this.visibility = 'hidden';
  }

}
