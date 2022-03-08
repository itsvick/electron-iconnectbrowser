import { BaseEntity } from './entity-base';
import { User } from './user';

export interface HowHear extends BaseEntity {
  name: string;

  users: User[];
}
