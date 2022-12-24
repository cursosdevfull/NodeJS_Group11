import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const listUsers = await userRepository.find();

    for (const user of listUsers) {
      console.log("user", JSON.stringify(user, null, "\t"));
      const cars = await user.cars;
      console.log("cars", JSON.stringify(cars, null, "\t"));
    }
  })
  .catch(console.log);
