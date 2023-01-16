import { err, ok, Result } from 'neverthrow';
import { v4 as uuidv4 } from 'uuid';

import { CipherService } from '../../users/application/services/cipher.service';
import { UserRepository } from '../../users/domain/user.repository';
import { AuthTokens } from './dtos/auth-tokens.dto';
import {
  AuthCredentialsInvalidException,
  AuthUserNotFoundException,
  AuthUserNotFoundWithRefreshTokenException,
} from './exceptions/auth.exception';
import { AuthService } from './services/auth.service';

export type AuthLoginResult = Result<
  AuthTokens,
  AuthUserNotFoundException | AuthCredentialsInvalidException
>;

export type AuthGetNewRefreshToken = Result<
  AuthTokens,
  AuthUserNotFoundWithRefreshTokenException
>;

export class AuthApplication {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<AuthLoginResult> {
    const userResult = await this.userRepository.getUserByEmail(email);

    if (userResult.isErr()) {
      return err(new AuthUserNotFoundException(userResult.error.message));
    }

    const passwordCipher = userResult.value.password;
    const refreshToken = userResult.value.refreshToken;

    const passwordMatch = CipherService.compare(password, passwordCipher);

    if (!passwordMatch) {
      return err(new AuthCredentialsInvalidException());
    }

    const accessToken = AuthService.generateAccessToken(userResult.value);

    return ok(new AuthTokens(accessToken, refreshToken));
  }

  async getNewAccessToken(
    refreshToken: string
  ): Promise<AuthGetNewRefreshToken> {
    const userResult = await this.userRepository.getUserByRefreshToken(
      refreshToken
    );

    if (userResult.isErr()) {
      return err(
        new AuthUserNotFoundWithRefreshTokenException(userResult.error.message)
      );
    }

    const userFoundResult = await this.userRepository.getOneWithPassword(
      userResult.value.id
    );

    if (userFoundResult.isErr()) {
      return err(
        new AuthUserNotFoundWithRefreshTokenException(
          userFoundResult.error.message
        )
      );
    }

    const user = userFoundResult.value;
    console.log(user);
    const newRefreshToken = uuidv4();
    user.update({ refreshToken: newRefreshToken });

    const updateResult = await this.userRepository.update(user);

    if (updateResult.isErr()) {
      return err(
        new AuthUserNotFoundWithRefreshTokenException(
          updateResult.error.message
        )
      );
    }

    userResult.value.refreshToken = newRefreshToken;
    console.log("newRefreshToken", newRefreshToken);
    console.log("userResult.value", userResult.value);
    const accessToken = AuthService.generateAccessToken(userResult.value);

    return ok(new AuthTokens(accessToken, newRefreshToken));
  }
}
