import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';
import { ComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() bgColorClassSection:string;
  @Input() bgColorClassContainer:string;
  @Input() title:string;
  @Input() description:string;
  @Input() modalContent :any;

  @ViewChild('parent', {read: ViewContainerRef}) parent:ViewContainerRef;

  private _componentRef: ComponentRef<any>;
  public innerHtmlContent:any;

  constructor( private _componetFR : ComponentFactoryResolver) { }

  ngOnInit() {
    this._buildModal();
  }

  private _buildModal(){
    switch(typeof this.modalContent){
      case'function':
        this.createComponent;
      break;
      case 'string':
        this.addToComponent;
      break;

    }
  }

  private createComponent(){
    this.parent.clear();
    let factory = this._componetFR.resolveComponentFactory(this.modalContent);
    this._componentRef = this.parent.createComponent(factory);
  }

  private addToComponent() {
    this.innerHtmlContent = this.modalContent;
}
}
