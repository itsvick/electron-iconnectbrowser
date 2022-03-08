import { BaseEntity, ParanoidBaseEntity } from './entity-base';
import { PackageOption } from './price-option';

export interface PendingPackageDowngrades extends ParanoidBaseEntity {
	subscriptionId: number;
	oldPackageId?: number;
	newPackageId?: number;

	newPackage: PackageOption;
	oldPackage?: PackageOption;

	downgradeDate: Date;
}
