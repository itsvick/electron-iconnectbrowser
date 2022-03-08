import { BaseEntity } from './entity-base';
import { Subject } from '.';

export interface Section extends BaseEntity {
  name: string;
  subjectId: number;
  subject: Subject;
}
