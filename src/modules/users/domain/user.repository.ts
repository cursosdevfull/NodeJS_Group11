import { User } from './user';

export interface UserRepository {
  insert(user: User): void;
  getAll(): User[];
}
