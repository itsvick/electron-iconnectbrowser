import { BaseEntity } from './entity-base';

export interface MediaCoverage extends BaseEntity {
  image: string;
  description: string;
  url: string;
  date: string;
}
