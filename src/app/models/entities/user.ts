import { BaseEntity, ParanoidBaseEntity } from './entity-base';



export interface User extends ParanoidBaseEntity {
  loginCred: string;
  email_phone: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  isAdmin: boolean;
  isActive: boolean;
  loginType: number;
}

export interface SubscriptionSummary {
  id: number;
 }

