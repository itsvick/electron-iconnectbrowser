import { TestBed } from '@angular/core/testing';

import { VideoBookmarkService } from './video-bookmark.service';

describe('VideoBookmarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoBookmarkService = TestBed.get(VideoBookmarkService);
    expect(service).toBeTruthy();
  });
});
