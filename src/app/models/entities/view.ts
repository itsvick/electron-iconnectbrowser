import { BaseEntity } from './entity-base';


export interface View extends BaseEntity {
  isOffline: boolean;
  viewCount: number;
  itemCode: string;
}
