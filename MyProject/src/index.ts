import { EntityManager } from 'typeorm';

import { AppDataSource } from './data-source';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';
import { UnitOfWork } from './unit-of-work/uow';

AppDataSource.initialize()
  .then(async (conn) => {
    const uow = new UnitOfWork(AppDataSource.manager);
    await uow.start();

    const work = async () => {
      const manager: EntityManager = uow.getManager();

      const car = new Car();
      car.brand = "Ferrari";
      car.model = "F40";
      car.year = 2022;
      car.color = "Red";

      const user = new User();
      user.name = "Kerr";
      user.email = "kerr.doe@email.com";
      user.age = 25;
      user.cars = [car];

      await manager.save(car);
      await manager.save(user);
    };

    await uow.complete(work);
  })
  .catch(console.log);
