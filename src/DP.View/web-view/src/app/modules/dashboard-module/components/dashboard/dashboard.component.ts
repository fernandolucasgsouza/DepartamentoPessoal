import { Component, OnInit } from '@angular/core';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faBell as faRegularBell, faSmileBeam, faSmileWink } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSmileWink, faSmileBeam,

    faRegularBell)
  }

  ngOnInit() {
  }

}
