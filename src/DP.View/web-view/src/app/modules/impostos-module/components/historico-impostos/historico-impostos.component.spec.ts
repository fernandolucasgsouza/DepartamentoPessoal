import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoImpostosComponent } from './historico-impostos.component';

describe('HistoricoImpostosComponent', () => {
  let component: HistoricoImpostosComponent;
  let fixture: ComponentFixture<HistoricoImpostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoImpostosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoImpostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
