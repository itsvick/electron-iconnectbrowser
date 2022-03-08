import { BaseEntity } from './entity-base';

export interface RedirectType extends BaseEntity {
  route: string;
  description: string;
}
