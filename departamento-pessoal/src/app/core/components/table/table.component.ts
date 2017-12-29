import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'fs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  /**
   * dataConfig
   * aling:string ['text-left','text-center','text-right']
   * widtd:number
   */
  @Input() dataConfig: any[];
  @Input() dataContent: any[][];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {}



}
