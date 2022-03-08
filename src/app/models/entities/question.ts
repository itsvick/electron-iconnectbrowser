import { BaseEntity } from './entity-base';

import {
  Video,
  Keyword,
  Country,
  Curriculum,
  Grade,
  Subject,
  Language,
  Paper,
  PackageType,
  UserQuestion,
  PreRequisite, Lesson,
} from '.';

export interface Question extends BaseEntity {
  idCode: string;
  status: string;
  questionCode: string;
  questionNumber: string;
  questionDescription?: string;
  mark: number;
  questionImage?: string;
  memo?: string;
  difficulty: number;
  qrImage: string;
  containsFormula: boolean;

  parentQuestionId?: number;
  video1Id?: number; // Needed if no video object is give
  video2Id?: number;
  video3Id?: number;
  originCountryId: number;
  packageTypeId: number;
  gradeId: number;
  subjectId: number;
  languageId: number;
  paperId: number;

  // virtual
  videoCount: number;
  isCompleted?: boolean;
  isParent?: boolean;

  parentQuestion?: Question;
  video1?: Video; // Needed if no video id is give
  video2?: Video;
  video3?: Video;
  originCountry?: Country;
  applicableCountry?: Country;
  curriculum?: Curriculum;
  grade?: Grade;
  subject?: Subject;
  language?: Language;
  packageType?: PackageType;

  preRequisites?: PreRequisite[];
  paper?: Paper;
  keywords?: Keyword[];
  childQuestions?: Question[];
  userQuestion?: UserQuestion;
  preRequisiteQuestions?: Question[];
  preRequisiteLessons?: Lesson[];

  curricula?: Curriculum[];
  countries?: Country[];

  // Virtual
  isPreRequisiteQuestion?: boolean;
}
