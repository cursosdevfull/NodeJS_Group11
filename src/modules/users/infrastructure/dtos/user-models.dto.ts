import { AuthApplicationDto } from '../../../auth/application/dtos/auth.dto';
import { RoleEntity } from '../../../roles/infrastructure/entities/role.entity';
import { UserInsertResultApp } from '../../application/results/user-insert.result';
import { UserListResultAppPaging } from '../../application/results/user-list-paging.result';
import { UserListResultApp } from '../../application/results/user-list.result';
import { UserOneResultApp } from '../../application/results/user-one.result';
import { User, UserProperties } from '../../domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserModelDto {
  static fromDomainToData(user: User): UserEntity {
    //return plainToInstance(user, UserEntity);
    const userProperties: UserProperties = user.properties();

    const userEntity = new UserEntity();
    userEntity.id = userProperties.id;
    userEntity.name = userProperties.name;
    userEntity.lastname = userProperties.lastname;
    userEntity.email = userProperties.email;
    userEntity.password = userProperties.password;
    userEntity.active = userProperties.active;
    userEntity.createdAt = userProperties.createdAt;
    userEntity.updatedAt = userProperties.updatedAt;
    userEntity.deletedAt = userProperties.deletedAt;
    userEntity.roles = userProperties.roles as RoleEntity[];
    userEntity.refreshToken = userProperties.refreshToken;

    return userEntity;
  }

  static fromDataToApplication(userEntity: UserEntity): UserInsertResultApp {
    return {
      id: userEntity.id,
      name: userEntity.name,
      lastname: userEntity.lastname,
      email: userEntity.email,
    };
  }

  static fromDataToApplicationList(
    userEntity: UserEntity[]
  ): UserListResultApp[] {
    return userEntity.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
      };
    });
  }

  static fromDataToApplicationListPaging(
    userEntity: UserEntity[],
    count: number
  ): UserListResultAppPaging {
    return {
      data: userEntity.map((user) => ({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
      })),
      count,
    };
  }

  static fromDataToApplicationOne(userEntity: UserEntity): UserOneResultApp {
    return {
      id: userEntity.id,
      name: userEntity.name,
      lastname: userEntity.lastname,
      email: userEntity.email,
      roles: userEntity.roles.map((role) => ({ id: role.id, name: role.name })),
    };
  }

  static fromDataToDomain(userEntity: UserEntity): User {
    const properties: UserProperties = {
      id: userEntity.id,
      name: userEntity.name,
      lastname: userEntity.lastname,
      email: userEntity.email,
      password: userEntity.password,
      roles: userEntity.roles.map((role) => role.id),
      active: userEntity.active,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      deletedAt: userEntity.deletedAt,
    };
    return new User(properties);
  }

  static fromDataToAuth(userEntity: UserEntity): AuthApplicationDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      lastname: userEntity.lastname,
      roles: userEntity.roles.map((role) => ({ id: role.id, name: role.name })),
      password: userEntity.password,
      refreshToken: userEntity.refreshToken,
    };
  }
}
