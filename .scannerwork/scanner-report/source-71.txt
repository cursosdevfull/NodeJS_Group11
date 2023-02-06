import { Request, Response } from 'express';

import RedisBootstrap from '../../../bootstrap/RedisBootstrap';
import { Validator } from '../../../core/validators/validator';
import {
  UserApplication,
  UserInsertResultApplication,
} from '../application/user.application';
import { UserUpdateProperties } from '../domain/user';
import { UserFactory, UserResult } from '../domain/user.factory';
import { IdVO } from '../domain/value-objects/id.vo';
import { UserInsertDto } from './dtos/user-insert.dto';

export class UserController {
  constructor(private readonly userApplication: UserApplication) {
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getByPage = this.getByPage.bind(this);
  }

  async insert(request: Request, response: Response) {
    const { name, lastname, email, password, roles, documentType, photo } =
      request.body;

    const userInsertDto = new UserInsertDto();
    userInsertDto.name = name;
    userInsertDto.lastname = lastname;
    userInsertDto.email = email;
    userInsertDto.password = password;
    userInsertDto.roles = roles;
    userInsertDto.documentType = documentType;
    userInsertDto.photo = photo;

    const errors = await Validator.use(userInsertDto);
    if (errors) {
      return response.status(411).json(errors);
    }

    const userResult: UserResult = UserFactory.create(
      name,
      lastname,
      email,
      password,
      roles,
      photo
    );

    if (userResult.isErr()) {
      return response.status(400).json({
        name: userResult.error.name,
        message: userResult.error.message,
      });
    }

    const userInsertResult: UserInsertResultApplication =
      await this.userApplication.insert(userResult.value);
    console.log('userInsertResult', userInsertResult);
    if (userInsertResult.isErr()) {
      return response.status(userInsertResult.error.status).json({
        name: userInsertResult.error.name,
        message: userInsertResult.error.message,
      });
    }

    response.status(201).json(userInsertResult.value);
  }

  async getAll(request: Request, response: Response) {
    const userResult = await this.userApplication.getAll();

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
    console.log('value', userResult.value);
    response.json(userResult.value);
  }

  async getByPage(request: Request, response: Response) {
    const { page, pageSize } = request.params;
    const userResult = await this.userApplication.getByPage(+page, +pageSize);

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

    const userResult = await this.userApplication.getOne(
      idResult.value.getValue()
    );

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

    const userGetOneResult = await this.userApplication.getOneWithPassword(
      idResult.value.getValue()
    );

    if (userGetOneResult.isErr()) {
      return response.status(userGetOneResult.error.status).json({
        name: userGetOneResult.error.name,
        message: userGetOneResult.error.message,
      });
    }

    const userUpdateResult = await this.userApplication.update(
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

    const userGetOneResult = await this.userApplication.getOneWithPassword(
      idResult.value.getValue()
    );

    if (userGetOneResult.isErr()) {
      return response.status(userGetOneResult.error.status).json({
        name: userGetOneResult.error.name,
        message: userGetOneResult.error.message,
      });
    }

    const userUpdateResult = await this.userApplication.delete(
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
