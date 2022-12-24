import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select(["user.id", "user.name", "user.age"])
      .where("user.id IN (:...ids)")
      .setParameters({ ids: [2, 4, 6] })
      .getRawMany();

    console.log("users", users);
  })
  .catch(console.log);
