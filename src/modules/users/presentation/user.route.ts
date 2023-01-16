import express from 'express';

import { AuthenticationMiddleware } from '../../../core/presentation/middlewares/authentication.middleware';
import { AuthorizationMiddleware } from '../../../core/presentation/middlewares/authorization.middleware';
import UserController from './user.controller';

class Router {
  router: express.Router;
  controller: UserController;
  authentication: AuthenticationMiddleware;
  authorization: AuthorizationMiddleware;

  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
    this.authentication = new AuthenticationMiddleware();
    this.authorization = new AuthorizationMiddleware();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.router.get(
      "/",
      this.authentication.use,
      this.authorization.build("ADMIN", "MEDIC"),
      this.controller.getAll
    );
    this.router.post(
      "/",
      //this.authentication.use,
      //this.authorization.build("ADMIN", "MEDIC"),
      this.controller.insert
    );
    this.router.get(
      "/:id",
      this.authentication.use,
      this.authorization.build("ADMIN", "MEDIC"),
      this.controller.getOne
    );
    this.router.put(
      "/:id",
      this.authentication.use,
      this.authorization.build("ADMIN", "MEDIC"),
      this.controller.update
    );
    this.router.delete(
      "/:id",
      this.authentication.use,
      this.authorization.build("ADMIN", "MEDIC"),
      this.controller.delete
    );
    this.router.get("/page/:page/:pageSize", this.controller.getByPage);
  }
}

export default new Router().router;
