import { err, ok, Result } from 'neverthrow';
import { RoleRepository } from 'src/modules/roles/domain/role.repository';

import { User, UserUpdateProperties } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserInsertDto } from './dtos/user-insert.dto';
import { UserListResultApp } from './results/user-list.result';
import { UserOneResultApp } from './results/user-one.result';
import { CipherService } from './services/cipher.service';

export type UserInsertResultApplication = Result<UserInsertDto, any>;
export type UserListResultApplication = Result<UserListResultApp[], any>;
export type UserOneResultApplication = Result<UserOneResultApp, any>;
export type UserOneResultApplicationWithPassword = Result<User, any>;
export class UserApplication {
  /* private repository: UserRepository;
  private cipherService: CipherService

  constructor(repository: UserRepository, cipherService: CipherService) {
    this.repository = repository;
    this.cipherService = cipherService;
  } */

  constructor(
    private readonly repositoryUser: UserRepository,
    private readonly repositoryRole: RoleRepository
  ) {}

  async getAll(): Promise<UserListResultApplication> {
    const listResult = await this.repositoryUser.getAll();

    if (listResult.isErr()) {
      return err(listResult.error);
    }

    return ok(listResult.value);
  }

  async getOne(id: string): Promise<UserOneResultApplication> {
    const getOneResult = await this.repositoryUser.getOne(id);

    if (getOneResult.isErr()) {
      return err(getOneResult.error);
    }

    return ok(getOneResult.value);
  }

  async getOneWithPassword(
    id: string
  ): Promise<UserOneResultApplicationWithPassword> {
    const getOneResult = await this.repositoryUser.getOneWithPassword(id);

    if (getOneResult.isErr()) {
      return err(getOneResult.error);
    }

    return ok(getOneResult.value);
  }

  async insert(user: User): Promise<UserInsertResultApplication> {
    user.password = await CipherService.encrypt(user.password);
    const rolesInstancesResult =
      await this.repositoryRole.getInstancesByArrayId(user.roles as number[]);

    if (rolesInstancesResult.isErr()) {
      return err(rolesInstancesResult.error);
    }

    user.roles = rolesInstancesResult.value;

    const userResult = await this.repositoryUser.insert(user);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    return ok(UserInsertDto.fromResponseToPresentation(userResult.value));
  }

  async update(
    user: User,
    properties: Partial<UserUpdateProperties>
  ): Promise<UserInsertResultApplication> {
    if (properties.password)
      properties.password = await CipherService.encrypt(properties.password);

    if (properties.roles) {
      const rolesInstancesResult =
        await this.repositoryRole.getInstancesByArrayId(
          properties.roles as number[]
        );

      if (rolesInstancesResult.isErr()) {
        return err(rolesInstancesResult.error);
      }

      properties.roles = rolesInstancesResult.value;
    }

    console.log("properties.roles", properties.roles);
    user.update(properties);

    const userResult = await this.repositoryUser.update(user);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    return ok(UserInsertDto.fromResponseToPresentation(userResult.value));
  }
}
