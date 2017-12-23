import { TestBed, inject } from '@angular/core/testing';

import { FormatDatasService } from './format-datas.service';

describe('FormatDatasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormatDatasService]
    });
  });

  it('should be created', inject([FormatDatasService], (service: FormatDatasService) => {
    expect(service).toBeTruthy();
  }));
});
