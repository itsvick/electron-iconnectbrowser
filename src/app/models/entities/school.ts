import { BaseEntity } from './entity-base';
import { User } from './user';
import { TimeFilter } from "../enum";
import { Sponsor, Class } from '.';

export interface School extends BaseEntity {
  name: string;
  monthlyCost?: number;
  paid?: boolean;
  teacherCount?: number;
  studentCount?: number;

  sponsorId?: number;

  classes?: Class[];
  users?: User[];
  sponsor?: Sponsor;

  totalCost?: number;
}

export interface FilterOptions {
  date?: TimeFilter;
  gradeId?: number;
  schoolId?: number;
  subjectId?: number;
  // showArchive: null
}
