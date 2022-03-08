import { BaseEntity } from './entity-base';

export interface SystemTask extends BaseEntity {
    name: string;
    isRunning: boolean;
    isActive: boolean;
    lastRanAt?: Date;
}
