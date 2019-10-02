import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostosComponent } from './impostos.component';

describe('ImpostosComponent', () => {
  let component: ImpostosComponent;
  let fixture: ComponentFixture<ImpostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImpostosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
