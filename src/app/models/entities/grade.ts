import { BaseEntity } from './entity-base';
import { Country, Curriculum, Class } from '.';

export interface Grade extends BaseEntity {
  name: string;
  order: number;
  isActive: boolean;

  curriculumId: number;

  curriculum?: Curriculum;
  classes?: Class[];
}
