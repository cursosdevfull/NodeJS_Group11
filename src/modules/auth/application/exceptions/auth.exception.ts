export class AuthUserNotFoundException extends Error {
  status: number = 500;
  constructor(message: string) {
    super(AuthUserNotFoundException.getMessage(message));
    this.name = "AuthUserNotFoundException";
  }

  static getMessage(message: string) {
    return `User not found: ${message}`;
  }
}

export class AuthUserNotFoundWithRefreshTokenException extends Error {
  status: number = 500;
  constructor(message: string) {
    super(AuthUserNotFoundWithRefreshTokenException.getMessage(message));
    this.name = "AuthUserNotFoundWithRefreshTokenException";
  }

  static getMessage(message: string) {
    return `User not found with refresh token: ${message}`;
  }
}

export class AuthCredentialsInvalidException extends Error {
  status: number = 500;
  constructor() {
    super(AuthCredentialsInvalidException.getMessage());
    this.name = "AuthCredentialsInvalidException";
  }

  static getMessage() {
    return `Credentials invalid`;
  }
}
