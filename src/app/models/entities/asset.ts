import { BaseEntity } from './entity-base';

export interface Asset extends BaseEntity {
  name: string;
  isFree: boolean;
  filePath: string;
}
