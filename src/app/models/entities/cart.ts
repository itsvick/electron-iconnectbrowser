import { BaseEntity } from './entity-base';
import { User, CartItem } from '.';
import { Order } from './order';

export interface Cart extends BaseEntity {
  total: number;
  isAnnual: boolean;
  hasSdCard: boolean;

  userId: number;
  orderId?: number; // This is only set when a cart is payed for

  user?: User;
  order?: Order;
  cartItems: CartItem[];
}
