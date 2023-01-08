import { err, ok, Result } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';

import { EmailInvalidException } from './exceptions/domain.exception';
import { User, UserProperties } from './user';
import { EmailVO } from './value-objects/email.vo';

export type UserResult = Result<User, EmailInvalidException | Error>;

export class UserFactory {
  static readonly patternEmail =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  static create(
    name: string,
    lastname: string,
    email: string,
    password: string,
    roles: number[]
  ): UserResult {
    if (roles.length === 0) {
      return err(new Error("Roles are required"));
    }

    for (const role of roles) {
      if (role < 1) {
        return err(new Error("Role is invalid"));
      }
    }

    if (name.length < 3) {
      return err(new Error("Name is too short"));
    }

    if (password.length < 6) {
      return err(new Error("Password is too short"));
    }

    if (email.trim().length === 0) {
      return err(new Error("Email is required"));
    }

    const emailResult = EmailVO.create(email);

    if (emailResult.isErr()) {
      return err(emailResult.error);
    }

    const properties: UserProperties = {
      id: uuidv4(),
      name,
      lastname,
      email: emailResult.value.getValue(),
      password,
      roles,
      refreshToken: uuidv4(),
    };

    return ok(new User(properties));
  }
}
