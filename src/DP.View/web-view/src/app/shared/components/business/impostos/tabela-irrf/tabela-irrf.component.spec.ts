import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaIrrfComponent } from './tabela-irrf.component';

describe('TabelaIrrfComponent', () => {
  let component: TabelaIrrfComponent;
  let fixture: ComponentFixture<TabelaIrrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaIrrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaIrrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
