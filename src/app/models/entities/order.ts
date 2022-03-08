import { BaseEntity } from './entity-base';
import { _PaymentType, OrderStatus } from '../enum';
import { User, Cart } from '.';

export interface Order extends BaseEntity {
  paymentType: _PaymentType;
  isCollect: boolean;
  status: OrderStatus;

  userId: number;
  cartId: number;

  user?: User;
  cart?: Cart;
}
