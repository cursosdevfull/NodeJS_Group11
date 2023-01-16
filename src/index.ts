import app from './app';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

(async () => {
  const server = new ServerBootstrap(app);
  const database = new DatabaseBootstrap();

  try {
    const listPromises = [server.initialize(), database.initialize()];
    await Promise.all(listPromises);

    console.log("Database is running");
  } catch (error) {
    console.log(error);
    database.close();
    server.close();
  }
})();