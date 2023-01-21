import { Application } from 'express';
import http from 'http';

import { AppService } from '../core/services/app.service';
import IBootstrap from './bootstrap.interface';

export default class implements IBootstrap {
  constructor(private readonly app: Application) {}

  initialize() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(AppService.PORT)
        .on('listening', () => {
          console.log(`Server is listening on port ${AppService.PORT}`);
          resolve(`Server is listening on port ${AppService.PORT}`);
        })
        .on('error', (error) => {
          reject(error);
          console.log('Server error', error);
          process.exit(1);
        });
    });
  }

  close(): void {
    process.exit(1);
  }
}
