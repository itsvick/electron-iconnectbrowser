import { BaseEntity } from './entity-base';
// import { UserType } from '.';

export interface ContactUs extends BaseEntity {
  name: string;
  email: string;
  contactNumber: string;
  message: string;

  userTypeId: number;

  // userType?: UserType;
}
