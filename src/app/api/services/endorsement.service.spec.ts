import { TestBed } from '@angular/core/testing';

import { EndorsementService } from './endorsement.service';

describe('EndorsementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndorsementService = TestBed.get(EndorsementService);
    expect(service).toBeTruthy();
  });
});
