import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../../../core/infrastructure/entity/base-entity';
import { UserEntity } from '../../../users/infrastructure/entities/user.entity';

@Entity({ name: "role" })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
