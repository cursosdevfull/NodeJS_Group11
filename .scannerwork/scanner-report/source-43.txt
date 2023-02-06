import { RoleListResult } from '../infrastructure/role.infrastructure';

export interface RoleRepository {
  getInstancesByArrayId(ids: number[]): Promise<RoleListResult>;
}
