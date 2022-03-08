import { BaseEntity } from './entity-base';
import { Paper, User, UserLesson, UserQuestion } from '.';

export interface UserPaper extends BaseEntity {
  views: number;
  memoModeCompleted: boolean;
  examModeCompleted: boolean;
  completedViaIds: boolean;

  userId: number;
  paperId: number;

  user?: User;
  paper?: Paper;
  userPaperQuestions?: UserQuestion[]
}
