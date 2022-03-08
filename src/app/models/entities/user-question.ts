import { BaseEntity } from './entity-base';
import { Question, User } from '.';

export interface UserQuestion extends BaseEntity {
  views: number;
  memoModeCompleted: boolean;
  examModeCompleted: boolean;
  memoViews: number;
  
  userId: number;
  questionId: number;

  user?: User;
  question?: Question;
}
