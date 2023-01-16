import { err, ok, Result } from 'neverthrow';

import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { AuthApplicationDto } from '../../auth/application/dtos/auth.dto';
import { UserInsertResultApp } from '../application/results/user-insert.result';
import { UserListResultAppPaging } from '../application/results/user-list-paging.result';
import { UserListResultApp } from '../application/results/user-list.result';
import { UserOneResultApp } from '../application/results/user-one.result';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserModelDto } from './dtos/user-models.dto';
import { UserEntity } from './entities/user.entity';
import {
  UserInsertException,
  UserListException,
  UserNotFoundException,
  UserNotFoundWithRefreshTokenException,
  UserOneException,
  UserUpdateException,
} from './exceptions/user.exception';

export type UserInsertResult = Result<UserInsertResultApp, UserInsertException>;
export type UserListResult = Result<UserListResultApp[], UserListException>;
export type UserListResultPaging = Result<
  UserListResultAppPaging,
  UserListException
>;
export type UserOneResult = Result<
  UserOneResultApp,
  UserListException | UserNotFoundException
>;
export type UserByEmailResult = Result<
  AuthApplicationDto,
  UserOneException | UserNotFoundException
>;
export type UserByRefreshTokenResult = Result<
  AuthApplicationDto,
  UserOneException | UserNotFoundWithRefreshTokenException
>;

export type UserOneResultWithPassword = Result<User, UserListException>;
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

  async update(user: User): Promise<UserInsertResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const userEntity = UserModelDto.fromDomainToData(user);
      const userUpdate = await repository.save(userEntity);
      return ok(UserModelDto.fromDataToApplication(userUpdate));
    } catch (error) {
      return err(new UserUpdateException(error.message));
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

  async getOne(id: string): Promise<UserOneResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const user: UserEntity = await repository.findOne({
        where: { active: true, id },
      });

      if (!user) {
        return err(new UserNotFoundException(id));
      }

      return ok(UserModelDto.fromDataToApplicationOne(user));
    } catch (error) {
      return err(new UserOneException(error.message));
    }
  }

  async getOneWithPassword(id: string): Promise<UserOneResultWithPassword> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const user: UserEntity = await repository.findOne({
        where: { active: true, id },
      });

      return ok(UserModelDto.fromDataToDomain(user));
    } catch (error) {
      return err(new UserOneException(error.message));
    }
  }

  async getByPage(
    page: number,
    pageSize: number
  ): Promise<UserListResultPaging> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const [users, count] = await repository.findAndCount({
        where: { active: true },
        skip: page * pageSize,
        take: pageSize,
      });

      console.log(users);

      return ok(UserModelDto.fromDataToApplicationListPaging(users, count));
    } catch (error) {
      return err(new UserListException(error.message));
    }
  }

  async getUserByEmail(email: string): Promise<UserByEmailResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const user: UserEntity = await repository.findOne({
        where: { active: true, email },
      });

      if (!user) {
        return err(new UserNotFoundException(email));
      }

      return ok(UserModelDto.fromDataToAuth(user));
    } catch (error) {
      return err(new UserOneException(error.message));
    }
  }

  async getUserByRefreshToken(
    refreshToken: string
  ): Promise<UserByRefreshTokenResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const user: UserEntity = await repository.findOne({
        where: { active: true, refreshToken },
      });

      if (!user) {
        return err(new UserNotFoundWithRefreshTokenException());
      }

      return ok(UserModelDto.fromDataToAuth(user));
    } catch (error) {
      return err(new UserOneException(error.message));
    }
  }
}
