import { err, ok, Result } from 'neverthrow';

import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserInsertDto } from './dtos/user-insert.dto';
import { UserListResultApp } from './results/user-list.result';

export type UserInsertResultApplication = Result<UserInsertDto, any>;
export type UserListResultApplication = Result<UserListResultApp[], any>;
export class UserApplication {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<UserListResultApplication> {
    const listResult = await this.repository.getAll();

    if (listResult.isErr()) {
      return err(listResult.error);
    }

    return ok(listResult.value);
  }

  async insert(user: User): Promise<UserInsertResultApplication> {
    const userResult = await this.repository.insert(user);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    return ok(UserInsertDto.fromResponseToPresentation(userResult.value));
  }
}
