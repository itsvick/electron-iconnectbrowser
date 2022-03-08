import { BaseEntity } from './entity-base';
import { Country } from '.';

export interface Address extends BaseEntity {
  floor?: number;
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  formattedAddress: string;
  country: string;
}
