import { TestBed } from '@angular/core/testing';

import { LiveRateService } from './live-rate.service';

describe('DemoService', () => {
  let service: LiveRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveRateService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});
