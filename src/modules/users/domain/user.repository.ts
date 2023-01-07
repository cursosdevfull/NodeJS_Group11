import {
  UserInsertResult,
  UserListResult,
  UserOneResult,
  UserOneResultWithPassword,
} from '../infrastructure/user.infrastructure';
import { User } from './user';

export interface UserRepository {
  insert(user: User): Promise<UserInsertResult>;
  getAll(): Promise<UserListResult>;
  getOne(id: string): Promise<UserOneResult>;
  getOneWithPassword(id: string): Promise<UserOneResultWithPassword>;
  update(user: User): Promise<any>;
}
