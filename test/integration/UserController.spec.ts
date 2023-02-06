import * as httpMock from 'node-mocks-http';

import RedisBootstrap from '../../src/bootstrap/RedisBootstrap';
import { RoleRepository } from '../../src/modules/roles/domain/role.repository';
import { RoleInfrastructure } from '../../src/modules/roles/infrastructure/role.infrastructure';
import { UserApplication } from '../../src/modules/users/application/user.application';
import { UserRepository } from '../../src/modules/users/domain/user.repository';
import { UserInfrastructure } from '../../src/modules/users/infrastructure/user.infrastructure';
import { UserController } from '../../src/modules/users/presentation/UserController';
import mockUserOne from '../mock/user-one.json';
import mockUsers from '../mock/users.json';

let mockSet: any;
let userInfrastructure: UserRepository;
let roleInfrastructure: RoleRepository;
let request: any;
let response: any;

describe('UserController - Integration', () => {
  beforeAll(() => {
    /* (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUsers,
      }),
      getOne: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUserOne,
      }),
    }); */
    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      getAll: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUsers,
      }),
      getOne: jest.fn().mockResolvedValue({
        isErr: () => false,
        isOk: () => true,
        value: mockUserOne,
      }),
    });
    (RoleInfrastructure as jest.Mock) = jest.fn().mockReturnValue({});
  });

  beforeEach(() => {
    mockSet = jest.fn();
    RedisBootstrap.set = mockSet;

    userInfrastructure = new UserInfrastructure();
    roleInfrastructure = new RoleInfrastructure();

    request = httpMock.createRequest();
    response = httpMock.createResponse();
  });

  it('getAll', async () => {
    // Arrange
    const userApplication = new UserApplication(
      userInfrastructure,
      roleInfrastructure
    );
    const userController = new UserController(userApplication);
    const request = httpMock.createRequest();
    const response = httpMock.createResponse();

    // Act
    await userController.getAll(request, response);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual(mockUsers);
    expect(mockSet).toHaveBeenCalledTimes(1);
  });

  it('getOne', async () => {
    // Arrange
    const id = '1b51538c-6087-4256-8e5f-ae89fbeea043';
    const userApplication = new UserApplication(
      userInfrastructure,
      roleInfrastructure
    );
    const userController = new UserController(userApplication);
    request.params.id = id;
    // Act
    await userController.getOne(request, response);

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response._getJSONData()).toEqual(mockUserOne);
    expect(mockSet).toHaveBeenCalledTimes(1);
  });
});
