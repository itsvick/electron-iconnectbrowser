import { BaseEntity } from './entity-base';
import { User } from './user';
import { Grade } from './grade';
import { Language } from './language';
import { Subject } from './subject';
import { Asset } from './asset';
import { Question } from './question';
import { PackageType } from '.';

export interface Paper extends BaseEntity {
  idCode: string;
  name: string;
  paperNo: number | string;
  year: string;
  month?: string;
  status: string; // Live/not-live
  sdCardVideoZip: string;
  completionTime: number;
  totalQuestions: number;
  totalVideos: number;
  thumbnail?: string;

  gradeId: number;
  subjectId: number;
  languageId: number;
  pdfId?: number; // Required, if not, than a pdf object is needed
  pdf2Id?: number; // Required, if not, than a pdf object is needed
  packageTypeId: number;

  grade: Grade;
  subject: Subject;
  language: Language;
  pdf?: Asset;
  pdf2?: Asset;
  users: User[];
  questions: Question[];
  packageType?: PackageType;
}
