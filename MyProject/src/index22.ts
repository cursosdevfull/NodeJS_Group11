import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select("sum(user.age)", "totalAge")
      .getRawOne();

    console.log("users", users);
  })
  .catch(console.log);
