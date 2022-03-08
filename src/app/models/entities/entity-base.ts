export interface BaseEntity {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ParanoidBaseEntity extends BaseEntity {
  deletedAt?: Date;
}
