import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;
    await manager
      .createQueryBuilder()
      .from(User, "user")
      .update()
      .set({ email: "newton.issac@email.com" })
      .where("user.id = :id", { id: 3 })
      .execute();

    await manager
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: 8 })
      .execute();

    const user = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select(["user.id", "user.name", "user.age"])
      .where("user.id = :id")
      .setParameters({ id: 3 })
      .getOne();

    console.log("user", user);
  })
  .catch(console.log);
