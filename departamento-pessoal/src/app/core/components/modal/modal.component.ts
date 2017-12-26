import { Component, OnInit, Input } from '@angular/core';

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
  @Input() component:Component;

  constructor() { }

  ngOnInit() {
  }

}
