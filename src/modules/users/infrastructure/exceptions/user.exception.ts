export class UserInsertException extends Error {
  status: number = 500;
  constructor(message: string) {
    super(UserInsertException.getMessage(message));
    this.name = "UserInsertException";
  }

  static getMessage(message: string) {
    return `An error ocurred while inserting the user: ${message}`;
  }
}

export class UserListException extends Error {
  status: number = 500;
  constructor(message: string) {
    super(UserListException.getMessage(message));
    this.name = "UserListException";
  }

  static getMessage(message: string) {
    return `An error ocurred while listing the users: ${message}`;
  }
}
