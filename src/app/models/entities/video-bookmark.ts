import { BaseEntity } from './entity-base';
import { Video } from '.';

export interface VideoBookmark extends BaseEntity {
  videoBookmarkId: string;
  videoBookmarkName: string;
  time: string;

  videoId: number;

  video?: Video;
}
