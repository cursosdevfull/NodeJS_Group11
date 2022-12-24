import { AppDataSource } from './data-source';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const carRepository = conn.getRepository(Car);
    const userRepository = conn.getRepository(User);

    const listUsers = await userRepository.find({ relations: ["cars"] });
    console.log("listUsers", JSON.stringify(listUsers, null, "\t"));

    const listCars = await carRepository.find({ relations: ["users"] });
    console.log("listCars", JSON.stringify(listCars, null, "\t"));
  })
  .catch(console.log);
