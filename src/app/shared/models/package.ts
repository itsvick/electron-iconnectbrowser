export interface PackageCard {
  isAnnual: boolean;
  typeId?: number;
  title: string;
  price: number;
  priceNote?: string;
  currency: string;
  show: boolean;
  subjects: PackageCardSubject[];
  packageNote?: string;
  buttonText: string;
  route?: boolean;
}

export interface PackageCardSubject {
  gradeName: string;
  subjectName: string;
  packageOptionId?: number;
  packageOptionIds?: number[];
  price: number;
  show: boolean;
  included: CountableState[];
}

export interface CountableState {
  name: string;
  count: number;
  disabled: boolean;
  show: boolean;
}
