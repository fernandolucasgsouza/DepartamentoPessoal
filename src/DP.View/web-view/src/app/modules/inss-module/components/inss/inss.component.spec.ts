import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InssComponent } from './inss.component';

describe('InssComponent', () => {
  let component: InssComponent;
  let fixture: ComponentFixture<InssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InssComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
