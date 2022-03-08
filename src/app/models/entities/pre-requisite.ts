import { BaseEntity } from './entity-base';
import { PreRequisiteType } from '../enum';
import {Lesson, Question} from '.';

export interface PreRequisite extends BaseEntity {
  name: string;
  type: PreRequisiteType;
  lessonId: number;
  questionId: number;

  lesson?: Lesson;
  question?: Question;

  /**
   * @see PreRequisiteTypeInternal
   * */
  preRequisiteType: number;

}

export interface PreRequisiteQuestion {
  questionId: number;
  preRequisiteIds: number[];
}