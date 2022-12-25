import { UserInsertResultApp } from '../results/user-insert.result';

export class UserInsertDto {
  static fromResponseToPresentation(
    response: UserInsertResultApp
  ): UserInsertDto {
    return {
      id: response.id,
      fullname: `${response.name} ${response.lastname}`,
      email: response.email,
    };
  }
}
