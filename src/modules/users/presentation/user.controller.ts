import { Request, Response } from 'express';

import { UserApplication, UserInsertResultApplication } from '../application/user.application';
import { UserFactory, UserResult } from '../domain/user.factory';
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
    this.insert = this.insert.bind(this);
  }

  async insert(request: Request, response: Response) {
    const { name, lastname, email, password } = request.body;
    const userResult: UserResult = UserFactory.create(
      name,
      lastname,
      email,
      password
    );

    if (userResult.isErr()) {
      return response.status(400).json({
        name: userResult.error.name,
        message: userResult.error.message,
      });
    }

    const userInsertResult: UserInsertResultApplication =
      await userApplication.insert(userResult.value);

    if (userInsertResult.isErr()) {
      return response.status(userInsertResult.error.status).json({
        name: userInsertResult.error.name,
        message: userInsertResult.error.message,
      });
    }

    /*  if (userInserted instanceof Error) {
      response.status(400).json({ message: userInserted.message });
      return;
    } */

    response.status(201).json(userInsertResult.value);
  }

  async getAll(request: Request, response: Response) {
    const userResult = await userApplication.getAll();

    if (userResult.isErr()) {
      return response.status(userResult.error.status).json({
        name: userResult.error.name,
        message: userResult.error.message,
      });
    }

    response.json(userResult.value);
  }
}

export default UserController;
