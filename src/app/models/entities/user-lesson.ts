import { BaseEntity } from './entity-base';
import { Lesson, User } from '.';

export interface UserLesson extends BaseEntity {
  views: number;
  completed: boolean;

  userId: number;
  lessonId: number;

  user?: User;
  lesson?: Lesson;
}
