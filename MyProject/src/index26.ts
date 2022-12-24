import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager.query("select id, name, age from user");

    console.log("users", users);
  })
  .catch(console.log);
