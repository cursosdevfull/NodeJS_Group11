import express from 'express';

import UserController from './user.controller';

class Router {
  router: express.Router;
  controller: UserController;

  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.insert);
  }
}

export default new Router().router;
