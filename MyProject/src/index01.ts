import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    /*     const user = new User();
    user.name = "Charles Smith";
    user.email = "charles.smith@email.com";
    await userRepository.save(user); */

    const listUsers = await userRepository.find();
    console.log("listUsers", listUsers);

    const user03 = await userRepository.findOne({ where: { id: 3 } });
    console.log("user03", user03);

    const userEqual42 = await userRepository.find({ where: { age: 42 } });
    console.log("userEqual42", userEqual42);

    const [records, count] = await userRepository.findAndCount({
      where: { active: true },
    });
    console.log("records", records);
    console.log("count", count);
  })
  .catch(console.log);
