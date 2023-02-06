export class EmailInvalidException extends Error {
  status = 400;

  constructor(message: string) {
    super(EmailInvalidException.getMessage(message));
    this.name = 'EmailInvalidException';
  }

  static getMessage(message: string) {
    return `The email is invalid: ${message}`;
  }
}

export class IdInvalidException extends Error {
  status = 400;

  constructor(message: string) {
    super(IdInvalidException.getMessage(message));
    this.name = 'IdInvalidException';
  }

  static getMessage(message: string) {
    return `The id is invalid: ${message}`;
  }
}
