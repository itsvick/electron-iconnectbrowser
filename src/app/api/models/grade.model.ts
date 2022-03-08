import { Grade } from '@models/entities';

export interface GradeBySubject extends Grade {
  lessonCount: number;
  paperCount: number;
}
