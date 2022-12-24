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

    const userRepository = conn.getRepository(User);
    const user = await userRepository
      .createQueryBuilder("usuario")
      .where("usuario.id = 3")
      .getOne();

    console.log("user", user);
  })
  .catch(console.log);
