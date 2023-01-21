import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

import { BaseEntity } from '../../../../core/infrastructure/entity/base-entity';
import { RoleEntity } from '../../../roles/infrastructure/entities/role.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  lastname: string;

  @Column('varchar', { length: 100, unique: true })
  email: string;

  @Column('varchar', { length: 150 })
  password: string;

  @Column('varchar', { length: 100 })
  refreshToken: string;

  @Column('boolean')
  active: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable()
  roles: RoleEntity[];
}
