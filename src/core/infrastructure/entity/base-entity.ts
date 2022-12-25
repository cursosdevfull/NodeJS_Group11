import { Column } from 'typeorm';

export class BaseEntity {
  @Column("datetime", { nullable: false })
  createdAt: Date;

  @Column("datetime", { nullable: true })
  updatedAt: Date;

  @Column("datetime", { nullable: true })
  deletedAt: Date;
}
