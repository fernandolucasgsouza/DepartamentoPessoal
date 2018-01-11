import { Component, OnInit, HostListener, ViewContainerRef, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { } from '@angular/core/src/metadata/lifecycle_hooks';

import * as sc from '../../../core/services';
import * as cc from '../../../core/components';
import * as s from '../../services';

@Component({
  selector: 'app-calcular-ferias',
  templateUrl: './calcular-ferias.component.html',
  styleUrls: ['./calcular-ferias.component.css']
})
export class CalcularFeriasComponent implements OnInit, OnChanges {

  @ViewChild(cc.ModalComponent) modal: cc.ModalComponent

  private _startObj = { ref: '-', proventos: '', descontos: '' };
  private _btnStatus: boolean = false;
  public modal_Inss: any;
  public modal_Irrf: any;
  public modalTitle: string;
  public modalDescription: string;
  public contentModal: any;

  public formCalculaFerias: FormGroup;
  public itemFerias: object = this._startObj;
  public itemFerias1_3: object = this._startObj;
  public itemInss: object = this._startObj;
  public itemIrrf: object = this._startObj;
  public itemSubTotais: object = this._startObj;
  public vrTotal: any = 0;
  public faltas: any = 0;

  public salario: number;
  public horasExtras: number;
  public diasFerias: number;
  public totDependentes: number;

  public fbGroup = {
    salario: new FormControl('0', Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.minLength(6)
    ])),
    horasExtras: new FormControl('0,00', Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.minLength(3)
    ])),
    faltas: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)
    ])),
    dias: new FormControl(
      { value: '', disabled: true },
      Validators.compose([
        Validators.required,
        Validators.min(5),
        Validators.max(30),
      ])
    ),
    dependentes: new FormControl('', Validators.compose([
      Validators.required,
      Validators.min(0)
    ])),
  };

  constructor(
    private _fb: FormBuilder,
    private _service: s.FeriasService,
  ) {
    this.formCalculaFerias = this._fb.group(this.fbGroup);

  }

  ngOnInit() {
    this.modal_Inss = cc.TabelaInssComponent;
    this.modal_Irrf = cc.TabelaIrrfComponent;
  }

  ngOnChanges(): void { }

  public keyupSalario(event: any) {
    this.salario = sc.FormatDatasService.formatForFloat(event.target.value);
  }

  public keyupHrExtras(event: any) {
    this.horasExtras = sc.FormatDatasService.formatForFloat(event.target.value);
  }

  public calcular(): void {
    let diasFerias = parseInt(this.formCalculaFerias.get('dias').value);
    let totDependentes = parseInt(this.formCalculaFerias.get('dependentes').value);

    let vrBrutoFerias = this._service.calculaFerias(this.salario, this.horasExtras, diasFerias);
    let vr1_3 = this._service.calculaFerias1_3(vrBrutoFerias);
    let vrInss = this._service.calculaINSS(vrBrutoFerias, vr1_3);
    let vrIrrf = this._service.calculaIRRF(vrBrutoFerias, vr1_3, vrInss, totDependentes);
    let somaProv = this._service.somaSubtotal(vrBrutoFerias, vr1_3);
    let somaDesc = this._service.somaSubtotal(vrInss, vrIrrf);

    this.vrTotal = this._service.calcTotal(somaProv, somaDesc);

    this.itemFerias = {
      ref: diasFerias + 'd',
      proventos: vrBrutoFerias,
      descontos: 0
    };
    this.itemFerias1_3 = {
      ref: '1/3',
      proventos: vr1_3,
      descontos: 0
    };
    this.itemInss = {
      ref: this._service.percentual_INSS + '%',
      proventos: 0,
      descontos: vrInss
    };
    this.itemIrrf = {
      ref: this._service.percentual_IRRF + '%',
      proventos: 0,
      descontos: vrIrrf
    };
    this.itemSubTotais = {
      ref: '-',
      proventos: somaProv,
      descontos: somaDesc
    };

    /**
     * apresenta valor total
     */
    this.fadeIn('fs-container-total');
  }

  onKeyFalta(event: any) {
    let vrInput = event.target.value;
    this._btnStatus = false;

    if (vrInput != undefined && vrInput != null && vrInput != '') {
      this.formCalculaFerias.get('dias').clearValidators();
      this.formCalculaFerias.get('dias').enable();
      this.faltas = this._service.verificaFaltas(parseInt(vrInput));
      this.formCalculaFerias.get('dias').setValue(this.faltas);
      this.formCalculaFerias.get('dias').setValidators([
        Validators.required,
        Validators.minLength(2),
        Validators.min(5),
        Validators.max(this.faltas)
      ]);

      if (this.faltas == 0) {
        this.formCalculaFerias.get('dias').disable();
        this._btnStatus = true;
        return
      }
    }
    else {
      this.formCalculaFerias.get('dias').disable();
      this.formCalculaFerias.get('dias').setValue('');
    }
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 27)
      this.clean();
  }

  public clean() {
    /**
    * reseta campos tabela [ref, proventos, descontos]
    */
    this.itemFerias = this._startObj;
    this.itemFerias1_3 = this._startObj;
    this.itemInss = this._startObj;
    this.itemIrrf = this._startObj;
    this.itemSubTotais = this._startObj;

    /**
     * reseta campos formulário inputs
     */
    for (let key in this.fbGroup) {
      if (key == 'horasExtras') {
        this.fbGroup[key].reset('0,00');
      } else {
        this.fbGroup[key].reset();
      }

    }
    this.setFocus('salario');
    this.fadeOut('fs-container-total');
    this.formCalculaFerias.get('dias').disable();
  }

  modalShown(id: string) {
    if (id == 'modal_1') {
      this.contentModal = this.modal_Inss;
      this.modalTitle = 'INSS - Instituto Nacional do Seguro Social',
        this.modalDescription = 'Tabela Empregado Doméstico e Trabalhador Avulso 2017'
    }
    else {
      this.contentModal = this.modal_Irrf;
      this.modalTitle = 'IRRF -  Imposto de Renda Retido na Fonte',
        this.modalDescription = 'Tabela referente ao ano de 2017'
    }

    this.modal.openModal();
  }



  public fadeIn(itemId: string) {
    let item = document.getElementById(itemId);
    item.classList.remove('fs-fade-out');
    item.classList.add('fs-fade-in');
  }

  public fadeOut(itemId: string) {
    let item = document.getElementById(itemId);
    item.classList.remove('fs-fade-in');
    item.classList.add('fs-fade-out');
  }

  public setFocus(itemId: any) {
    let item = document.getElementById(itemId).focus();
  }
}
