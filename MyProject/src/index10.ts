import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const listUsers = await userRepository.find({
      order: { name: "DESC", email: "DESC" },
    });

    console.log("listUsers", listUsers);
  })
  .catch(console.log);
