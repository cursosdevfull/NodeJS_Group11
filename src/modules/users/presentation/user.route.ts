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
    this.router.get("/:id", this.controller.getOne);
    this.router.put("/:id", this.controller.update);
    this.router.delete("/:id", this.controller.delete);
    this.router.get("/page/:page/:pageSize", this.controller.getByPage);
  }
}

export default new Router().router;
