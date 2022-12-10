import app from './app';
import ServerBootstrap from './bootstrap/server.bootstrap';

try {
  const server = new ServerBootstrap(app);
  server.initialize();
} catch (error) {
  console.log(error);
  process.exit(1);
}
