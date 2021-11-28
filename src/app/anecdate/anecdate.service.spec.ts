import { TestBed } from '@angular/core/testing';

import { AnecdateService } from './anecdate.service';

describe('AnecdateService', () => {
  let service: AnecdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnecdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
