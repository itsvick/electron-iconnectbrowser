import { EftPaymentStatus, PaymentStatus, PaymentType } from '../enum';
import { BaseEntity } from './entity-base';
import { EftPayment } from "./eft-payments";
import { PeachPayment } from "./peach-payment";

export interface Payment extends BaseEntity {
  subscriptionId: number;
  uuid: string;
  status: number;
  amount: string;
  paymentId: string;
  paymentRequestCount: number;
  scheduledAt?: Date;
  paymentType: number;
  paymentDescription: number;
  sageTaxInvoice?: number;

  eftPayment?: EftPayment;
  peachPayment?: PeachPayment;
}

export interface PeachResponse {
  id?: string;
  registrationId?: string;
  subscriptionRef?: string;

  result: {
    code: string;
    description: string;
  };

  success: boolean;
  status: PaymentStatus;
  message: string;
}

/**
 * @property id
 * @property subscriptionRef The reference code for the subscription this payment is connected to
 * @property paymentStatus The status of the payment can be {@link PaymentStatus} or {@link EftPaymentStatus}
 * @property success This will be true if the payment status is Success
 * @property message A message to display to the user regarding the payment
 * */
export interface PaymentResponse {
  id?: number | string;
  subscriptionRef?: string;
  paymentStatus: number;
  success: boolean
  message: string | { title: string, icon: string, description: string };
}

export interface InvoiceHistoryItem {
  id: number;
  name: string;
  price: string;
  date: string;
  isLoadingPdf: boolean;
  hasPdf: boolean;
}
