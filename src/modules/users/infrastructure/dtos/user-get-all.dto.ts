import { User } from '../../domain/user';
import { UserEntity } from '../entities/user.entity';

export class UserGetAllDto {
  static fromDataToDomain(data: UserEntity[]): User[] {
    return data.map((user) => {
      return new User(user.fullName, user.email, user.password);
    });
  }
}
