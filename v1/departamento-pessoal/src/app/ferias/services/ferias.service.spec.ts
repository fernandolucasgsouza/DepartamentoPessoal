import { TestBed, inject } from '@angular/core/testing';

import { FeriasService } from './ferias.service';

describe('FeriasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeriasService]
    });
  });

  it('should be created', inject([FeriasService], (service: FeriasService) => {
    expect(service).toBeTruthy();
  }));
});
