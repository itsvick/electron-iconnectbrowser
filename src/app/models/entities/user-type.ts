import { BaseEntity } from './entity-base';
import { User } from './user';

export interface UserType extends BaseEntity {
  type: string;

  users?: User[];
}
