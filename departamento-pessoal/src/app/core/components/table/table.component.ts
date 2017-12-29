import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'fs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {


  /**
   * aling ['text-left','text-center','text-right']
   */

  @Input() dataHead: any = [];
  @Input() dataBody: any[][];
  @Input() dataAling: any[][];


  constructor(
  ) { }

  ngOnInit() { }


  ngAfterViewInit(): void {
    let itensAling = document.getElementsByClassName("fs-th");
    let obj = [];
    for (let i = 0; i < itensAling.length; i++) {
      obj.push(itensAling[i].getAttribute("aling"))
    };
    this.dataAling = obj
    console.log(obj)
  }



}
