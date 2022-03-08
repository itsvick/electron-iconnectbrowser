import { BaseEntity } from './entity-base';

export interface Country extends BaseEntity {
  name: string;
  currency: string;
}
