import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasTabelaImpostosComponent } from './ferias-tabelas-impostos.component';

describe('FeriasTabelaImpostosComponent', () => {
  let component: FeriasTabelaImpostosComponent;
  let fixture: ComponentFixture<FeriasTabelaImpostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriasTabelaImpostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriasTabelaImpostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
