import { TestBed } from '@angular/core/testing';

import { HowHearService } from './how-hear.service';

describe('HowHearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HowHearService = TestBed.get(HowHearService);
    expect(service).toBeTruthy();
  });
});
