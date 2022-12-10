import { Application } from 'express';
import http from 'http';
import yenv from 'yenv';

import IBootstrap from './bootstrap.interface';

const env = yenv();

export default class implements IBootstrap {
  constructor(private readonly app: Application) {}

  initialize() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(env.PORT)
        .on("listening", () => {
          console.log(`Server is listening on port ${env.PORT}`);
          resolve(`Server is listening on port ${env.PORT}`);
        })
        .on("error", (error) => {
          reject(error);
          console.log("Server error", error);
          process.exit(1);
        });
    });
  }
}
