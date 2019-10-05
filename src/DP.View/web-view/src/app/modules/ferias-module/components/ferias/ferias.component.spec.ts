import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasComponent } from './ferias.component';

describe('FeriasComponent', () => {
  let component: FeriasComponent;
  let fixture: ComponentFixture<FeriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
