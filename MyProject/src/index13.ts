import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    //const userRepository = conn.getRepository(User);
    /*     const manager = conn.manager;

    const user = new User();
    user.name = 'User 1';
    user.email = 'user01@email.com";
    user.age = 20;

    await manager.getRepository(User).save(user); */

    const manager = conn.manager;
    //const user = await manager
    //.createQueryBuilder(User, "usuario")
    const sql = await manager
      .createQueryBuilder()
      .from(User, "usuario")
      .select("usuario.id, usuario.name")
      .where("usuario.id = 3")
      //.getRawOne();
      .getSql();

    //console.log("user", user);
    console.log("sql", sql);
  })
  .catch(console.log);
