import { BaseEntity } from './entity-base';
import { Video } from './video';
import { User } from './user';

export interface VideoView extends BaseEntity {
  watchTime: number;
  completed: boolean;

  userId: number;
  videoId: number;

  video?: Video;
  user?: User;
}
