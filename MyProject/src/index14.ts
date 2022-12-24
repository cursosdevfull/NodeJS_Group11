import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;
    const user = await manager
      .createQueryBuilder()
      .from(User, "usuario")
      .select(["usuario.id userId", "usuario.name userName"])
      .where("usuario.id = :id", { id: 3 })
      .getRawOne();

    console.log("user", user);
  })
  .catch(console.log);
