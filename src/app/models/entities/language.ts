import { BaseEntity } from './entity-base';

export interface Language extends BaseEntity {
  name: string;
  code: string;
}
