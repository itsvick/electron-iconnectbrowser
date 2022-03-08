import { BaseEntity } from './entity-base';

export interface Class extends BaseEntity {
	name: string;
	studentCount?:number;
	schoolId:number;
	gradeId:number;
	teacherId?:number;
}
