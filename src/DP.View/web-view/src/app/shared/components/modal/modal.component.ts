import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RouterCustomService } from 'src/app/core/services/router/router-custom.service';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  /**
   * Atribuir 'show' para apresentar o botão de fechar modal
   **/
  @Input() buttonClose = 'hide';
  constructor(private router: Router, private routerCustomService: RouterCustomService) { }

  public get previousUrl() {
    return this.routerCustomService.routerUrl.last;
  }

  public closeModal() {
    this.router.navigate([this.previousUrl]);
  }

}
