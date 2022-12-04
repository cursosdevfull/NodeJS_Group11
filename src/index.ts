import http from 'http';
import yenv from 'yenv';

import app from './app';

const env = yenv();

const server = http.createServer(app);

server
  .listen(env.PORT)
  .on("listening", () => console.log(`Server is listening on port ${env.PORT}`))
  .on("error", (error) => {
    console.log("Server error", error);
    process.exit(1);
  });
