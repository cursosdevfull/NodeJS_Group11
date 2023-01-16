import express from 'express';

import AuthController from './auth.controller';

class Router {
  router: express.Router;
  controller: AuthController;

  constructor() {
    this.router = express.Router();
    this.controller = new AuthController();
    this.mountRoutes();
  }

  mountRoutes(): void {
    this.router.post("/login", this.controller.login);
    this.router.post("/refresh-token", this.controller.getNewAccessToken);
  }
}

export default new Router().router;
