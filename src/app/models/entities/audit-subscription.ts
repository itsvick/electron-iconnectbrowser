import { Subscription } from '.';
import { BaseEntity } from './entity-base';

export interface AuditSubscription extends BaseEntity {
	subscriptionId: number;
	log: string;
	parsedSubscription?: Subscription;
}
