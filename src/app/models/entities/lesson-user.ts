import { BaseEntity } from './entity-base';
import { Lesson, User } from '.';

export interface LessonUser extends BaseEntity {
  completed: boolean;

  userId: number;
  lessonId: number;

  question?: Lesson;
  user?: User;
}
