import { BaseEntity } from './entity-base';
import { Payment } from './index';

export interface EftPayment extends BaseEntity {
	uuid: string;
	status: number;
	ref: string;
}
