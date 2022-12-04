import { Request, Response } from 'express';

import { UserApplication } from '../application/user.application';
import { UserRepository } from '../domain/user.repository';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';

const userInfrastructure: UserRepository = new UserInfrastructure();
const userApplication: UserApplication = new UserApplication(
  userInfrastructure
);

class UserController {
  mockUsers() {
    return [
      { name: "User 1", age: 10 },
      { name: "User 2", age: 20 },
    ];
  }

  constructor() {
    this.getAll = this.getAll.bind(this);
  }

  getAll(request: Request, response: Response) {
    response.json(userApplication.getAll());
  }
}

export default UserController;
