import { BaseEntity } from './entity-base';
import { School } from "./school";
import { User } from "./user";

export interface Sponsor extends BaseEntity {
  name: string;
  description?: string;
  logo?: string;
  sponsorType?: number;
  paid: boolean
  discount: string;
  // discountedAmount?: string;
  // discountType: number;
  userId?: number

  user?: User;
  schools?: School[];
}
