import { TestBed } from '@angular/core/testing';

import { MediaCoverageService } from './media-coverage.service';

describe('MediaCoverageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaCoverageService = TestBed.get(MediaCoverageService);
    expect(service).toBeTruthy();
  });
});
