import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoImpostoIrrfComponent } from './historico-imposto-irrf.component';

describe('HistoricoImpostoIrrfComponent', () => {
  let component: HistoricoImpostoIrrfComponent;
  let fixture: ComponentFixture<HistoricoImpostoIrrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoImpostoIrrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoImpostoIrrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
