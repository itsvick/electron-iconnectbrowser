import { TestBed } from '@angular/core/testing';

import { QuestionSearchService } from './question-search.service';

describe('QuestionSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionSearchService = TestBed.get(QuestionSearchService);
    expect(service).toBeTruthy();
  });
});
