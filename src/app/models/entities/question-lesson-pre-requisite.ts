import { BaseEntity } from './entity-base';
import { PreRequisiteType } from '../enum';
import {Lesson, Question} from '.';

export interface QuestionLessonPreRequisite extends BaseEntity {
  questionId: number;
  lessonId: number;

  lesson?: Lesson;
  question?: Question;
}