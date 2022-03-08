import { BaseEntity } from './entity-base';
import { Country } from '.';

export interface Curriculum extends BaseEntity {
  name: string;
  country?: Country;
}
