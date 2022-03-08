import { TestBed } from '@angular/core/testing';

import { UpdateSubjectService } from './update-subject.service';

describe('UpdateSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateSubjectService = TestBed.get(UpdateSubjectService);
    expect(service).toBeTruthy();
  });
});
