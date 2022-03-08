export enum PackageStatusEnum {
	active = 0,
	pendingCancel = 1,
	pendingDowngrade = 2,
	//  NOTE: This is only used in the front end. DON NOT USE IN THE API AT ALL!!*/
	pendingUpgrade = 3,
	newPackage = 4,
}
