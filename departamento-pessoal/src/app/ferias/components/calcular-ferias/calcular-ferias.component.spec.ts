import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularFeriasComponent } from './calcular-ferias.component';

describe('CalcularFeriasComponent', () => {
  let component: CalcularFeriasComponent;
  let fixture: ComponentFixture<CalcularFeriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularFeriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
