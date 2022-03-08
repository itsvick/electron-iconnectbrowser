import { BaseEntity } from './entity-base';
import { Paper, Question } from '.';

export interface QuestionPaper extends BaseEntity {
  questionId: number;
  paperId: number;

  paper?: Paper;
  question?: Question;
}
