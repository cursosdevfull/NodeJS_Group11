import { err } from 'neverthrow';

import { UserRepository } from '../../users/domain/user.repository';
import { AuthRepository } from '../domain/auth.repository';
import { AuthUserNotFoundException } from './exceptions/auth.exception';

export class AuthInfrastructure implements AuthRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<AuthLoginResult> {
    const userFoundResult = await this.userRepository.getOneWithPassword(email);

    if (userFoundResult.isErr()) {
      return err(new AuthUserNotFoundException(userFoundResult.error.message));
    }

    const userFound = userFoundResult.value;

    if (userFound.password !== password) {
    }
  }
}
