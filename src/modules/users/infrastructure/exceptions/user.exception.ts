export class UserInsertException extends Error {
  status = 500;
  constructor(message: string) {
    super(UserInsertException.getMessage(message));
    this.name = 'UserInsertException';
  }

  static getMessage(message: string) {
    return `An error ocurred while inserting the user: ${message}`;
  }
}

export class UserUpdateException extends Error {
  status = 500;
  constructor(message: string) {
    super(UserUpdateException.getMessage(message));
    this.name = 'UserUpdateException';
  }

  static getMessage(message: string) {
    return `An error ocurred while updating the user: ${message}`;
  }
}

export class UserListException extends Error {
  status = 500;
  constructor(message: string) {
    super(UserListException.getMessage(message));
    this.name = 'UserListException';
  }

  static getMessage(message: string) {
    return `An error ocurred while listing the users: ${message}`;
  }
}

export class UserOneException extends Error {
  status = 500;
  constructor(message: string) {
    super(UserOneException.getMessage(message));
    this.name = 'UserOneException';
  }

  static getMessage(message: string) {
    return `An error ocurred while getting the users: ${message}`;
  }
}

export class UserNotFoundException extends Error {
  status = 404;
  constructor(message: string) {
    super(UserNotFoundException.getMessage(message));
    this.name = 'UserNotFoundException';
  }

  static getMessage(message: string) {
    return `UserID or Email: ${message} not found`;
  }
}

export class UserNotFoundWithRefreshTokenException extends Error {
  status = 404;
  constructor() {
    super(UserNotFoundWithRefreshTokenException.getMessage());
    this.name = 'UserNotFoundWithRefreshTokenException';
  }

  static getMessage() {
    return `User not found with refresh token`;
  }
}
