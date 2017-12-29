import { Component, OnInit, Input, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() bgColorClassSection: string;
  @Input() bgColorClassContainer: string;
  @Input() title: string;
  @Input() description: string;
  @Input() modalContent: any;
  @Input() idModal: any;


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  private _componentRef: ComponentRef<any>;
  public innerHtmlContent: any;

  constructor(private _componetFR: ComponentFactoryResolver) { }

  ngOnInit() {
    this._buildModal();
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

  private addToComponent() {
    this.innerHtmlContent = this.modalContent;
  }

  public closeModal(event) {
   
  }

}
