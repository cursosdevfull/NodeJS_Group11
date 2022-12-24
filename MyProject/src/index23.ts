import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select("user.id, user.name")
      .having("user.id > :id", { id: 5 })
      .getRawMany();

    console.log("users", users);
  })
  .catch(console.log);
