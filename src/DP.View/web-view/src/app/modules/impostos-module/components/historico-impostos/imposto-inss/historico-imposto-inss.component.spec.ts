import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoImpostoInssComponent } from './historico-imposto-inss.component';

describe('HistoricoImpostoInssComponent', () => {
  let component: HistoricoImpostoInssComponent;
  let fixture: ComponentFixture<HistoricoImpostoInssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoImpostoInssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoImpostoInssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
