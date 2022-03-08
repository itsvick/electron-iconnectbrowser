import { BaseEntity } from './entity-base';

export interface Endorsement extends BaseEntity {
  name: string;
  surname: string;
  description: string;
  image: string;
  pinned: boolean;
  level: number;
}
