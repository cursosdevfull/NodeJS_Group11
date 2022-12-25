import { UserInsertResultApp } from '../../application/results/user-insert.result';
import { UserListResultApp } from '../../application/results/user-list.result';
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
}
