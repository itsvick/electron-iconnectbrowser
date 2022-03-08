import { BaseEntity } from './entity-base';
import { PublicationType } from '../enum';
import { Grade } from './grade';
import { Subject } from './subject';
import { Language } from './language';
import { Country } from './country';
import { Asset, User, UserPublication } from '.';

export interface Publication extends BaseEntity {
  idCode: string;
  name: string;
  year: string;
  isActive: boolean;
  type?: number;
  hardCopyWeight: number;
  hardCopyPrice: number;
  outOfStock: boolean;
  sageItemCode?: number;

  countryId: number;
  gradeId: number;
  subjectId: number;
  languageId: number;

  country?: Country;
  grade?: Grade;
  subject?: Subject;
  language?: Language;
  users?: User[];
  userPublication?: UserPublication;
}
