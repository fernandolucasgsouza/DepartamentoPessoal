import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasImpostosComponent } from './tabelas-impostos.component';

describe('TabelasImpostosComponent', () => {
  let component: TabelasImpostosComponent;
  let fixture: ComponentFixture<TabelasImpostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelasImpostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelasImpostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
