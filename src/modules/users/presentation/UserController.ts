import { Request, Response } from 'express';
import { RoleRepository } from 'src/modules/roles/domain/role.repository';

import RedisBootstrap from '../../../bootstrap/RedisBootstrap';
import { Validator } from '../../../core/validators/validator';
import { RoleInfrastructure } from '../../roles/infrastructure/role.infrastructure';
import { UserApplication, UserInsertResultApplication } from '../application/user.application';
import { UserUpdateProperties } from '../domain/user';
import { UserFactory, UserResult } from '../domain/user.factory';
import { UserRepository } from '../domain/user.repository';
import { IdVO } from '../domain/value-objects/id.vo';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';
import { UserInsertDto } from './dtos/user-insert.dto';

const userInfrastructure: UserRepository = new UserInfrastructure();
const roleInfrastructure: RoleRepository = new RoleInfrastructure();
const userApplication: UserApplication = new UserApplication(
  userInfrastructure,
  roleInfrastructure
);

class UserController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getByPage = this.getByPage.bind(this);
  }

  async insert(request: Request, response: Response) {
    const { name, lastname, email, password, roles, documentType } =
      request.body;

    const userInsertDto = new UserInsertDto();
    userInsertDto.name = name;
    userInsertDto.lastname = lastname;
    userInsertDto.email = email;
    userInsertDto.password = password;
    userInsertDto.roles = roles;
    userInsertDto.documentType = documentType;

    const errors = await Validator.use(userInsertDto);
    if (errors) {
      return response.status(411).json(errors);
    }

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

    RedisBootstrap.set(
      response.locals.cacheKey,
      JSON.stringify(userResult.value)
    );
    response.json(userResult.value);
  }

  async getByPage(request: Request, response: Response) {
    const { page, pageSize } = request.params;
    const userResult = await userApplication.getByPage(+page, +pageSize);

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
    const idResult = IdVO.create(id);

    if (idResult.isErr()) {
      return response.status(idResult.error.status).json({
        name: idResult.error.name,
        message: idResult.error.message,
      });
    }

    const userResult = await userApplication.getOne(idResult.value.getValue());

    if (userResult.isErr()) {
      return response.status(userResult.error.status).json({
        name: userResult.error.name,
        message: userResult.error.message,
      });
    }

    RedisBootstrap.set(
      response.locals.cacheKey,
      JSON.stringify(userResult.value)
    );

    response.json(userResult.value);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const idResult = IdVO.create(id);

    if (idResult.isErr()) {
      return response.status(idResult.error.status).json({
        name: idResult.error.name,
        message: idResult.error.message,
      });
    }
    const body: Partial<UserUpdateProperties> = request.body;

    const userGetOneResult = await userApplication.getOneWithPassword(
      idResult.value.getValue()
    );

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

    response.status(201).json('User updated');
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const idResult = IdVO.create(id);

    if (idResult.isErr()) {
      return response.status(idResult.error.status).json({
        name: idResult.error.name,
        message: idResult.error.message,
      });
    }

    const userGetOneResult = await userApplication.getOneWithPassword(
      idResult.value.getValue()
    );

    if (userGetOneResult.isErr()) {
      return response.status(userGetOneResult.error.status).json({
        name: userGetOneResult.error.name,
        message: userGetOneResult.error.message,
      });
    }

    const userUpdateResult = await userApplication.delete(
      userGetOneResult.value
    );

    if (userUpdateResult.isErr()) {
      return response.status(userUpdateResult.error.status).json({
        name: userUpdateResult.error.name,
        message: userUpdateResult.error.message,
      });
    }

    response.status(201).json('User deleted');
  }
}

export default UserController;
