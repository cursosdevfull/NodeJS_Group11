import app from './app';
import DatabaseBootstrap from './bootstrap/DatabaseBootstrap';
import RedisBootstrap from './bootstrap/RedisBootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

(async () => {
  const server = new ServerBootstrap(app);
  const database = new DatabaseBootstrap();
  const redis = new RedisBootstrap();

  try {
    const listPromises = [
      server.initialize(),
      database.initialize(),
      redis.initialize(),
    ];
    await Promise.all(listPromises);

    console.log('Database is running');
  } catch (error) {
    console.log(error);
    database.close();
    redis.close();
    server.close();
  }
})();
