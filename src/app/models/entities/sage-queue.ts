import { ParanoidBaseEntity } from './entity-base';

export interface SageQueue extends ParanoidBaseEntity {
	data?: string;
	ran: boolean;
	type: number;
	typeId: number;
}
