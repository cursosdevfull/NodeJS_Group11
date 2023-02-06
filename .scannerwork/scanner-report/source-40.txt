export class AuthUserNotFoundException extends Error {
  status = 500;
  constructor(message: string) {
    super(AuthUserNotFoundException.getMessage(message));
    this.name = 'AuthUserNotFoundException';
  }

  static getMessage(message: string) {
    return `User not found: ${message}`;
  }
}
