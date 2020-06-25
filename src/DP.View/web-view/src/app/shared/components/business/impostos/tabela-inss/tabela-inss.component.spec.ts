import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaInssComponent } from './tabela-inss.component';

describe('TabelaInssComponent', () => {
  let component: TabelaInssComponent;
  let fixture: ComponentFixture<TabelaInssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaInssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaInssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
