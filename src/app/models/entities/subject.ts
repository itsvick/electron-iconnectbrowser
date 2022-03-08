import { BaseEntity } from './entity-base';
import { Video, Grade } from '.';
import { PackageType } from '@models/enum';

export interface Subject extends BaseEntity {
  name: string;
  code: string; // Must be 3 letters
  isActive: boolean;
  isFree?: boolean;
  jingleId?: number;
  packageTypeId?: number;
  jingle?: Video;
  grade?: Grade;

}
