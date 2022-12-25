import { err, ok, Result } from 'neverthrow';

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { UserInsertResultApp } from '../application/results/user-insert.result';
import { UserListResultApp } from '../application/results/user-list.result';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserModelDto } from './dtos/user-models.dto';
import { UserEntity } from './entities/user.entity';
import { UserInsertException, UserListException } from './exceptions/user.exception';

export type UserInsertResult = Result<UserInsertResultApp, UserInsertException>;
export type UserListResult = Result<UserListResultApp[], UserListException>;
export class UserInfrastructure implements UserRepository {
  async insert(user: User): Promise<UserInsertResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = UserModelDto.fromDomainToData(user);
      const userInserted = await repository.save(userEntity);
      return ok(UserModelDto.fromDataToApplication(userInserted));
    } catch (error) {
      return err(new UserInsertException(error.message));
    }
  }

  async getAll(): Promise<UserListResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const users: UserEntity[] = await repository.find({
        where: { active: true },
      });

      console.log(users);

      return ok(UserModelDto.fromDataToApplicationList(users));
    } catch (error) {
      return err(new UserListException(error.message));
    }
  }
}
