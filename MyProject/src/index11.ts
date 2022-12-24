import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const PAGE_SIZE = 3;
    const PAGE = 1;

    const [users, count] = await userRepository.findAndCount({
      order: { name: "DESC", email: "DESC" },
      skip: PAGE * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const cars = await users[0].cars;

    console.log("users", users);
    console.log("count", count);
    console.log("cars", cars);
  })
  .catch(console.log);
