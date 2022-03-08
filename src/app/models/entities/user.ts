import { BaseEntity, ParanoidBaseEntity } from './entity-base';

import {
  HowHear,
  UserType,
  School,
  Address,
  Publication,
  SubscriptionOverview,
  RedirectType,
  Sponsor,
  Grade,
  Class, Subscription, UserPublication
} from '.';
import { SubscriptionStatus } from '@models/enum';

export interface User extends ParanoidBaseEntity {
  loginCred: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  rememberToken: string;
  resetToken: string;
  passwordReset: boolean;
  isAdmin: boolean;
  isActive: boolean;
  loginType: number;
  dataShare: boolean;
  sageId?: number;
  marketing: boolean;
  verified?: boolean;
  hasSchoolSubscription?: boolean;

  monitorId?: number;
  addressId?: number;
  schoolId?: number;
  gradeId?: number;
  classId?: number;
  userTypeId: number;
  howHearId?: number;
  redirectTypeId?: number;
  sponsorId?: number;

  monitor?: User;
  students?: User[];
  school?: School;
  grade?: Grade;
  class?: Class;
  address?: Address;
  howHear?: HowHear;
  userType?: UserType;
  publications?: Publication[];
  redirectType?: RedirectType;
  sponsor?: Sponsor;
  subscription? : Subscription;
}

export interface SubscriptionSummary {
  id: number;
  ref: string;
  shippingTotal: string
  total: string;
  firstName?: string;
  lastName?: string;
  isAnnual: boolean;
  promotionCode?: string;
  status: number,
  isFree: boolean;
  subscriptions: Array<SubscriptionOverview>;
}

export interface Student {
  id: number;
  name: string;
  surname: string;
  grade: string;
  class: string;
  isVerified: boolean;
  dataShare: boolean;
}

export interface Filter {
  gradeId: number;
  subjectId: number;
  packageTypeId: number;
  userTypes: number[];
}
