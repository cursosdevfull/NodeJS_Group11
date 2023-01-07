import { err, ok, Result } from 'neverthrow';
import { In } from 'typeorm';

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { RoleRepository } from '../domain/role.repository';
import { RoleEntity } from './entities/role.entity';
import { RoleListException } from './exceptions/role.exception';

export type RoleListResult = Result<RoleEntity[], RoleListException>;

export class RoleInfrastructure implements RoleRepository {
  async getInstancesByArrayId(ids: number[]): Promise<RoleListResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(RoleEntity);
      return ok(await repository.findBy({ id: In(ids) }));
    } catch (error) {
      return err(new RoleListException(error.message));
    }
  }
}
