import { BaseEntity } from "./entity-base";

export interface Promotion extends BaseEntity {
  code: string;
  uses: number;
  maxUses: number;
  depleted: boolean;
  duration: string;
  expireDate: Date;
}


export interface PromotionValidResponse {
  isExpired?: boolean;
  isDepleted?: boolean;
  message?: string;
}
