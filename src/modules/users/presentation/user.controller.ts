import { Request, Response } from 'express';
import { RoleRepository } from 'src/modules/roles/domain/role.repository';

import { RoleInfrastructure } from '../../roles/infrastructure/role.infrastructure';
import { UserApplication, UserInsertResultApplication } from '../application/user.application';
import { UserUpdateProperties } from '../domain/user';
import { UserFactory, UserResult } from '../domain/user.factory';
import { UserRepository } from '../domain/user.repository';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';

const userInfrastructure: UserRepository = new UserInfrastructure();
const roleInfrastructure: RoleRepository = new RoleInfrastructure();
const userApplication: UserApplication = new UserApplication(
  userInfrastructure,
  roleInfrastructure
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
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
  }

  async insert(request: Request, response: Response) {
    const { name, lastname, email, password, roles } = request.body;
    const userResult: UserResult = UserFactory.create(
      name,
      lastname,
      email,
      password,
      roles
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

  async getOne(request: Request, response: Response) {
    const { id } = request.params;
    const userResult = await userApplication.getOne(id);

    if (userResult.isErr()) {
      return response.status(userResult.error.status).json({
        name: userResult.error.name,
        message: userResult.error.message,
      });
    }

    response.json(userResult.value);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const body: Partial<UserUpdateProperties> = request.body;

    const userGetOneResult = await userApplication.getOneWithPassword(id);

    if (userGetOneResult.isErr()) {
      return response.status(userGetOneResult.error.status).json({
        name: userGetOneResult.error.name,
        message: userGetOneResult.error.message,
      });
    }

    const userUpdateResult = await userApplication.update(
      userGetOneResult.value,
      body
    );

    if (userUpdateResult.isErr()) {
      return response.status(userUpdateResult.error.status).json({
        name: userUpdateResult.error.name,
        message: userUpdateResult.error.message,
      });
    }

    response.status(201).json("User updated");
  }
}

export default UserController;
