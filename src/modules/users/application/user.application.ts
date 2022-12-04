import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

export class UserApplication {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  getAll(): User[] {
    return this.repository.getAll();
  }

  insert(user: User): void {
    return this.repository.insert(user);
  }
}
