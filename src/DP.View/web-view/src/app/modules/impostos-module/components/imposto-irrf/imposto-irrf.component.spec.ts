import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostoIrrfComponent } from './imposto-irrf.component';

describe('ImpostoIrrfComponent', () => {
  let component: ImpostoIrrfComponent;
  let fixture: ComponentFixture<ImpostoIrrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostoIrrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostoIrrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
