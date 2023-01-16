import {
  UserByEmailResult,
  UserByRefreshTokenResult,
  UserInsertResult,
  UserListResult,
  UserListResultPaging,
  UserOneResult,
  UserOneResultWithPassword,
} from '../infrastructure/user.infrastructure';
import { User } from './user';

export interface UserRepository {
  insert(user: User): Promise<UserInsertResult>;
  getAll(): Promise<UserListResult>;
  getOne(id: string): Promise<UserOneResult>;
  getOneWithPassword(id: string): Promise<UserOneResultWithPassword>;
  update(user: User): Promise<UserInsertResult>;
  getByPage(page: number, pageSize: number): Promise<UserListResultPaging>;
  getUserByEmail(email: string): Promise<UserByEmailResult>;
  getUserByRefreshToken(
    refreshToken: string
  ): Promise<UserByRefreshTokenResult>;
}
