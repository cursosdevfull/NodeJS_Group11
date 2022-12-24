import { AppDataSource } from './data-source';
import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const carRepository = conn.getRepository(Car);
    const userRepository = conn.getRepository(User);

    const car1 = new Car();
    car1.brand = "Fiat";
    car1.model = "Uno";
    car1.color = "Red";
    car1.year = 1990;

    const car2 = new Car();
    car2.brand = "Kia";
    car2.model = "Picanto";
    car2.color = "Blue";
    car2.year = 2010;

    const user = new User();
    user.name = "John Doe";
    user.email = "john.doe@email.com";
    user.age = 30;
    user.cars = [car1, car2];

    const userInserted = await userRepository.save(user);
    console.log("User inserted: ", userInserted);
  })
  .catch(console.log);
