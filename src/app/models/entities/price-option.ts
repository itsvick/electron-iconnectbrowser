import { BaseEntity, ParanoidBaseEntity } from './entity-base';
import { Subject, PackageType, Grade, Publication } from '.';

export interface PackageOption extends ParanoidBaseEntity {
	gradeId: number;
	subjectId: number;
	countryId: number;
	packageTypeId: number;
	price: string;
	isActive: boolean;
	sageItemCode: number;
	status?: PackageStatus;
	subscriptionId?: number;

	grade?: Grade;
	subject?: Subject;
	packageType?: PackageType;
	packagePapers?: number | { eng: number, afr: number };
	packageLessons?: number | { eng: number, afr: number };
	packageVideos?: number;

	packageExamBook?: number | { eng: number, afr: number };
	packageLessonBook?: number | { eng: number, afr: number };
}

export class PackageStatus {
	constructor(
		public type?: number,
		public status?: string,
		public cancellationDate?: Date,
	) {
	}
}

