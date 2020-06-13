import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostoInssComponent } from './imposto-inss.component';

describe('ImpostoInssComponent', () => {
  let component: ImpostoInssComponent;
  let fixture: ComponentFixture<ImpostoInssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostoInssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostoInssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
