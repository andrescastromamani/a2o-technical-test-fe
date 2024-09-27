import { TestBed } from '@angular/core/testing';

import { StringValueService } from './string-value.service';

describe('StringValueService', () => {
  let service: StringValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
