import express from 'express';

import RedisBootstrap from '../../../bootstrap/RedisBootstrap';
import { AuthenticationMiddleware } from '../../../core/presentation/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../../../core/presentation/middlewares/authorization.middleware';
import { CacheMiddleware } from '../../../core/presentation/middlewares/cache.middleware';
import { RoleRepository } from '../../roles/domain/role.repository';
import { RoleInfrastructure } from '../../roles/infrastructure/role.infrastructure';
import { UserApplication } from '../application/user.application';
import { UserRepository } from '../domain/user.repository';
import { UserInfrastructure } from '../infrastructure/user.infrastructure';
import UserController from './UserController';

const userInfrastructure: UserRepository = new UserInfrastructure();
const roleInfrastructure: RoleRepository = new RoleInfrastructure();
const userApplication: UserApplication = new UserApplication(
  userInfrastructure,
  roleInfrastructure
);

class Router {
  router: express.Router;
  controller: UserController;
  authentication: AuthenticationMiddleware;
  authorization: AuthorizationMiddleware;
  cache: CacheMiddleware;

  constructor() {
    this.router = express.Router();
    this.controller = new UserController(userApplication);
    this.authentication = new AuthenticationMiddleware();
    this.authorization = new AuthorizationMiddleware();
    this.cache = new CacheMiddleware();
    this.mountRouteInvalidateCache();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.router.get(
      '/',
      this.authentication.use,
      this.authorization.build('ADMIN', 'MEDIC'),
      this.cache.build('user-get-all'),
      this.controller.getAll
    );
    this.router.post(
      '/',
      //this.authentication.use,
      //this.authorization.build('ADMIN', 'MEDIC'),
      /*       Upload.save(
        new UploadBuilder()
          .addFieldName('photo')
          .addMaxSize(5000000)
          .addDestination('')
          .addIsPublic(true)
          .addAllowedMimeTypes(['image/jpeg', 'image/png'])
          .build()
      ), */
      this.controller.insert
    );
    this.router.get(
      '/:id',
      this.authentication.use,
      this.authorization.build('ADMIN', 'MEDIC'),
      this.cache.build('user-by-id'),
      this.controller.getOne
    );
    this.router.put(
      '/:id',
      this.authentication.use,
      this.authorization.build('ADMIN', 'MEDIC'),
      this.controller.update
    );
    this.router.delete(
      '/:id',
      this.authentication.use,
      this.authorization.build('ADMIN', 'MEDIC'),
      this.controller.delete
    );
    this.router.get('/page/:page/:pageSize', this.controller.getByPage);
  }

  mountRouteInvalidateCache(): void {
    this.router.get('/invalidate-cache', (req, res) => {
      RedisBootstrap.clear('user');
      res.send('Cache invalidated');
    });
  }
}

export default new Router().router;
