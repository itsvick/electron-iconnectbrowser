import { BaseEntity } from './entity-base';

export interface SubscriptionPackage extends BaseEntity {
    subscriptionId: number;
    packageOptionId: number;
}
