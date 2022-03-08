import { BaseEntity } from './entity-base';
import { User } from './user';

export interface UserHistory extends BaseEntity {
	id?: number;

	userId: number;
	users?: User;

	createdAt?: Date;
	updatedAt?: Date;
}

export interface SchoolUserHistoryResult {
	schoolId: number;
	data: UserHistoryResult[];
}

export interface UserHistoryResult {
	userCount: number;
	date: Date;
}

