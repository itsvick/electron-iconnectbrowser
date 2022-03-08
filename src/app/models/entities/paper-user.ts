import { BaseEntity } from './entity-base';

export interface PaperUser extends BaseEntity {
  completionTime: number;
  completed: boolean;

  userId: number;
  paperId: number;
}
