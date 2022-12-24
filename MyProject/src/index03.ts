import { AppDataSource } from './data-source';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const carRepository = conn.getRepository(Car);
    const userRepository = conn.getRepository(User);

    const car = new Car();
    car.brand = "Toyota";
    car.model = "Corolla";
    car.color = "White";
    car.year = 2019;

    /*     const carInserted = await carRepository.save(car);
    console.log("Car inserted: ", carInserted); */

    const user = new User();
    user.name = "David Mose";
    user.email = "david.mose@email.com";
    user.age = 30;
    user.car = car;

    const userInserted = await userRepository.save(user);
    console.log("User inserted: ", userInserted);
  })
  .catch(console.log);
