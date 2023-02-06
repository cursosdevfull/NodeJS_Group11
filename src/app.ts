import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';

import RouterAuth from './modules/auth/presentation/auth.route';
import RouterUsers from './modules/users/presentation/user.route';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.init();
    this.healthCheck();
    this.middlewares();
    this.mountRoutes();
  }

  init() {
    multer({
      limits: {
        fileSize: 8000000,
      },
    });
  }

  healthCheck(): void {
    this.app.get('/', (req, res) => res.send("It's alive!"));
    this.app.get('/healthcheck', (req, res) => res.send("It's alive!"));
    this.app.get('/healthz', (req, res) => res.send("It's alive!"));
  }

  middlewares(): void {
    const corsOptions = {
      origin: ['http://localhost:4200', 'http://midominio.com'],
    };
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  mountRoutes(): void {
    this.app.use('/users', RouterUsers);
    this.app.use('/auth', RouterAuth);
  }
}

export default new App().app;
