import { BaseEntity } from './entity-base';

export interface QuestionView extends BaseEntity {
  views: number;

  userId: number;
  questionId: number;
}
