import { BaseEntity } from './entity-base';
import { User, Publication } from '.';

export interface UserPublication extends BaseEntity {
  userId: number;
  publicationId: number;
  shippingStatus: number;
  isSelfCollect: boolean;
  shippingTotal: number;

  user?: User;
  publication?: Publication;
}
