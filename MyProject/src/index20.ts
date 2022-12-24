import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select(["user.id", "user.name", "user.age"])
      .where("user.age >= :minAge")
      .orWhere("user.name = :name")
      .setParameters({ minAge: 40, name: "Leonardo Davinci" })
      .getRawMany();

    console.log("users", users);
  })
  .catch(console.log);
