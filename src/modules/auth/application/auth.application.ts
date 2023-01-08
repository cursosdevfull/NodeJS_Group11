import { err } from 'neverthrow';

import { UserRepository } from '../../users/domain/user.repository';

export class AuthApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string) {
    const userResult = await this.userRepository.getUserByEmail(email);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    console.log(userResult.value);
  }
}
