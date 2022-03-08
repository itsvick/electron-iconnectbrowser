import { Invoice } from './invoice';

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>> // tslint:disable-next-line:no-shadowed-variable
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export interface EmailTemplateOptions {
  layout?: string | boolean;
  baseLayout?: 'base-layout';
  precompile?: boolean;
  message?: string;
  title?: string;
  buttonText?: string;
}

export interface EmailTemplateMarkers extends EmailTemplateOptions {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PasswordEmailTemplate extends EmailTemplateOptions {
  hostUrl: string;
  passwordKey: string;
}

export interface WelcomeEmailTemplate extends EmailTemplateOptions {
  hostUrl: string;
  token: string;
  passwordKey?: string;
}

export interface AbandonedCartEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface ChildWeeklyReportEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface DashboardReportEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface NoUsageEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface PaymentFailEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface StudentWeeklyReportEmailTemplate extends EmailTemplateOptions {
  message: string;
}

export interface ContactUsEmailTemplate extends EmailTemplateOptions {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  userType: string;
}

export interface HbrEmailTable<T> extends EmailTemplateOptions {
  titles: string[];
  tableObjects: DeepPartial<T>[];
}

export interface InvoiceTableTemplate extends HbrEmailTable<Invoice> {}
