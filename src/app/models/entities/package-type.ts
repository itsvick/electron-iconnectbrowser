import { BaseEntity } from './entity-base';

export interface PackageType extends BaseEntity {
  name: string;
  priority?: number;
}
