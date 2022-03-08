import { BaseEntity } from './entity-base';
import { Grade, Subject, Cart, Publication } from '.';

export interface CartItem extends BaseEntity {
  price: number;
  weight: number;
  hasExamBook: boolean;
  hasLessonBook: boolean;

  publicationId: number;
  cartId: number;

  publication?: Publication;
  cart?: Cart;
}
