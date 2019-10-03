import { Component, OnInit } from '@angular/core';
import { MaskProvider } from 'src/app/core/format-datas/mask.provider';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public mask: MaskProvider = MaskProvider;

  constructor() {

  }

  ngOnInit() {

  }

}
