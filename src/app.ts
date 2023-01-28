import express from 'express';

import RouterAuth from './modules/auth/presentation/auth.route';
import RouterUsers from './modules/users/presentation/user.route';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.healthCheck();
    this.middlewares();
    this.mountRoutes();
  }

  healthCheck(): void {
    this.app.get('/', (req, res) => res.send("It's alive!"));
    this.app.get('/healthcheck', (req, res) => res.send("It's alive!"));
    this.app.get('/healthz', (req, res) => res.send("It's alive!"));
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
