import { TestBed } from '@angular/core/testing';

import { PreRequisiteService } from './pre-requisite.service';

describe('PreRequisiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreRequisiteService = TestBed.get(PreRequisiteService);
    expect(service).toBeTruthy();
  });
});
