import { Brackets } from 'typeorm';

import { AppDataSource } from './data-source';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const manager = conn.manager;

    const users = await manager
      .createQueryBuilder()
      .from(User, "user")
      .select(["user.id", "user.name", "user.age"])
      .where("user.age = :age")
      .andWhere(
        new Brackets((qb) => {
          qb.where("user.name = :name1", { name1: "Karl Sagan" }).orWhere(
            "user.name = :name2",
            { name2: "Nicolás Copernico" }
          );
        })
      )
      .setParameters({ age: 40 })
      .getRawMany();

    console.log("users", users);
  })
  .catch(console.log);
