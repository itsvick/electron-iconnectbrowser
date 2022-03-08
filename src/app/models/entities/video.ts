import { BaseEntity } from './entity-base';
import { VideoBookmark } from '.';

export interface Video extends BaseEntity {
  id?: number;
  videoId: string;
  videoName: string;
  fileName?: string;
  videoLength?: number;

  videoBookmarks?: VideoBookmark[];
}
