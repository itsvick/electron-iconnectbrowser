import { TestBed } from '@angular/core/testing';

import { PackageOptionService } from './package-option.service';

describe('PackageOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackageOptionService = TestBed.get(PackageOptionService);
    expect(service).toBeTruthy();
  });
});
