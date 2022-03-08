import { BaseEntity } from './entity-base';

export interface PeachPayment extends BaseEntity {
    paymentId: number;
    transactionId: string;
    code: string;
    description: string;
    remarks: string;
}
