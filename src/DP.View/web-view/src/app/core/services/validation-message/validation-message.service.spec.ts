import { TestBed } from '@angular/core/testing';

import { ValidationMessageService } from './validation-message.service';

describe('ValidationMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationMessageService = TestBed.inject(ValidationMessageService);
    expect(service).toBeTruthy();
  });
});
