export class EmailInvalidException extends Error {
  status: number = 400;

  constructor(message: string) {
    super(EmailInvalidException.getMessage(message));
    this.name = "EmailInvalidException";
  }

  static getMessage(message: string) {
    return `The email is invalid: ${message}`;
  }
}
