import express from 'express';

import RouterAuth from './modules/auth/presentation/auth.route';
import RouterUsers from './modules/users/presentation/user.route';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.mountRoutes();
  }

  middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  mountRoutes(): void {
    this.app.use('/users', RouterUsers);
    this.app.use('/auth', RouterAuth);
  }
}

export default new App().app;
