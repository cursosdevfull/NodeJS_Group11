import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const queryRunner = conn.createQueryRunner();

    await queryRunner.startTransaction();

    const manager = queryRunner.manager;

    try {
      const insertedUser = await manager
        .createQueryBuilder()
        .from(User, "user")
        .insert()
        .values({ name: "Roldán", email: "roldan@email.com", age: 40 })
        .execute();

      console.log(insertedUser);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  })
  .catch(console.log);
