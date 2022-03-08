import { BaseEntity } from './entity-base';
import { Asset } from './asset';
import { Grade } from './grade';
import { Subject } from './subject';
import { Language } from './language';
import { Video } from './video';
import { Keyword, PackageType, PreRequisite } from '.';

export interface Lesson extends BaseEntity {
  id?: number;
  name: string;
  idCode: string;
  completionTime: number;
  status: string;
  lessonCode: string;
  type?: number;
  thumbnail?: string;

  pdfId?: number;
  gradeId: number;
  subjectId: number;
  languageId: number;
  videoId?: number; // Required if no video object is given
  packageTypeId: number;

  pdf?: Asset;
  grade?: Grade;
  subject?: Subject;
  language?: Language;
  video?: Video;
  preRequisites?: PreRequisite[];
  preRequisiteLessons?: Lesson[];
  keywords?: Keyword[];
  packageType?: PackageType;
}
