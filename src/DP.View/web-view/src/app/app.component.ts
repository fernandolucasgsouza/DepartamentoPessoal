import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouterCustomService } from './core/services/router/router-custom.service';
import { routerTransition } from './core/providers/animations/router-animation';


@Component({
  selector: 'fs-root',
  animations: [routerTransition],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Departamento Pessoal';

  public getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  constructor(routerCustomService: RouterCustomService) {
    routerCustomService.getUrl();
  }
}


