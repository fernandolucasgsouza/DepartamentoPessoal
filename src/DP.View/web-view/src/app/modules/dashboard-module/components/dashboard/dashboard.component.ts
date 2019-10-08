import { Component, OnInit } from '@angular/core';
import { MaskProvider } from 'src/app/core/providers/mask.providers';


@Component({
  selector: 'fs-dashboard',
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
