import { User } from './user';

export class UserFactory {
  static readonly patternEmail =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  static create(name: string, email: string, password: string): User {
    if (name.length < 3) {
      throw new Error("Name is too short");
    }

    if (password.length < 6) {
      throw new Error("Password is too short");
    }

    if (!this.patternEmail.test(email)) {
      throw new Error("Email is not valid");
    }

    return new User(name, email, password);
  }
}
