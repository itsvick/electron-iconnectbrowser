import { Subject } from '@models/entities';

export interface SubjectStats {
  subject: string;
  stats: Stat[];
}

export interface Stat {
  grade: string;
  hasPaper: boolean;
  hasLesson: boolean;
}

export interface MySubjectResponse extends Subject {
  hasPapers: boolean;
  hasLessons: boolean;
  paperLanguages: number[];
  lessonLanguages: number[];
}
