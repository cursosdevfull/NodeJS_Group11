import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const insertedUser = await manager
      .createQueryBuilder()
      .from(User, "user")
      .insert()
      .values({ name: "Roldán", email: "roldan@email.com", age: 40 })
      .execute();

    console.log(insertedUser);
  })
  .catch(console.log);
