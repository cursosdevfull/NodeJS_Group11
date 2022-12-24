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

    const user1 = new User();
    user1.name = "John Doe";
    user1.email = "john.doe@email.com";
    user1.age = 30;
    user1.cars = [car1, car2];

    const user2 = new User();
    user2.name = "Issac Newton";
    user2.email = "issac.newton@email.com";
    user2.age = 40;
    user2.cars = [car1];

    const userInserted1 = await userRepository.save(user1);
    console.log("User inserted1: ", userInserted1);

    const userInserted2 = await userRepository.save(user2);
    console.log("User inserted2: ", userInserted2);
  })
  .catch(console.log);
