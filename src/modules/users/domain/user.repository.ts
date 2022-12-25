import { UserInsertResult, UserListResult } from '../infrastructure/user.infrastructure';
import { User } from './user';

export interface UserRepository {
  insert(user: User): Promise<UserInsertResult>;
  getAll(): Promise<UserListResult>;
}
