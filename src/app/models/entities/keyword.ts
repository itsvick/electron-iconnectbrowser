import { BaseEntity } from './entity-base';
import { Video } from './video';

export interface Keyword extends BaseEntity {
  name: string;

  videos: Video[];
}
