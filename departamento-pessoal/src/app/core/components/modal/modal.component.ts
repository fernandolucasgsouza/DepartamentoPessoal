import {
  Component, OnInit, Input, ComponentRef, ViewContainerRef, ViewChild, ComponentFactoryResolver,
  trigger, style, state, transition, animate
} from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ModalAnimations } from './modal.amination';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [ModalAnimations]
})

export class ModalComponent implements OnInit {

  @Input() bgColorClassSection: string;
  @Input() bgColorClassContainer: string;
  @Input() title: string;
  @Input() description: string;
  @Input() modalContent: any;
  @Input() idModal: any;
  @Input() modalOpen;

  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;

  private _componentRef: ComponentRef<any>;
  public innerHtmlContent: any;
  public visibility: string = 'hidden';

  constructor(private _componetFR: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
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

  public closeModal() {
    this.visibility = 'hidden';
    this._componentRef.destroy();
  }

  openModal() {
    this.visibility = 'shown';
    this._buildModal();
  }

}
