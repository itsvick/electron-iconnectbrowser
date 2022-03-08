import { BaseEntity } from './entity-base';
import { SubscriptionStatus } from '../enum';
import { PackageOption, Payment, Publication, User } from '.';

export interface Subscription extends BaseEntity {
	userId: number;
	parentId: number;
	ref: string;
	status: SubscriptionStatus;
	nextBillingDate: Date;
	startDate: Date;
	endDate: Date;
	paymentToken: string;
	isAnnual: boolean;
	promotionCode?: string;
	promotionId?: number;
	packageOptions?: Array<PackageOption>;
	childSubscriptions?: Array<Subscription>
	paymentType?: number;
	payments?: Payment[];
}

export interface SubscriptionOverview {
	id: number;
	ref: string;
	userId: number;
	user?: Partial<User>;
	isAnnual: boolean;
	discountPercentage: number;
	discount: string;
	subscriptionTotal: string;
	publicationTotal: string;
	shippingCost: string;
	grandTotal: string;
	promotionCode?: string;
	isFree?: boolean;
	packages: Array<PackageOverview>;
	publications: Array<Publication>
}

export interface PackageOverview {
	id: number;
	description: string;
	price: string;
	pricingOptions: Array<PricingOption>;
	publicationOptions: Array<PublicationOption>;
	gradeId?: number;
	subjectId?: number;
	display?: boolean;
	packageTypeId: number;
	sageItemId?: number;
}

export interface PricingOption {
	id: number;
	name: string;
	price: string;
	packageTypeId: number;
	selected?: boolean;
	display?: boolean;
}

export interface AccountTotal {
	name: string;
	isPrivate: boolean;
	total: number;
}

export interface RegistrationStats {
	registrations: number;
	activeRegistrations: number;
	highEngagement: number;
}

export interface ProgressStats {
	completed: number;
	videoViews: number;
	memoPeeks: number;
}

export interface PublicationOption {
	id: number;
	name: string;
	price: string;
	selected?: boolean;
}

export class SubscriptionInformation {
	constructor(public name: string,
	            public schoolName: string,
	            public paymentType: number,
	            public packageType: string,
	            public amount: string,
	            public nextBillingDate: Date,
	            public subscriptionStatus: number,
	            public paymentStatus: number,
	            public peachId: string,
	            public reference: string,
	) {
	}
}


export class UpgradePackagesResults {
	constructor(public packages: PackageOption[],
	            public originalPackage?: PackageOption) {
	}
}
