import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager.query("call getUsersByAge(?)", [40]);

    console.log("users", users);

    const insertResult = await manager.query("call insertUser(?, ?, ?)", [
      "Javier",
      "javier@email.com",
      40,
    ]);
  })
  .catch(console.log);
