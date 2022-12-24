import { AppDataSource } from './data-source';
import { Car } from './entity/car.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const carRepository = conn.getRepository(Car);

    const car = new Car();
    car.brand = "Fiat";
    car.model = "Uno";
    car.color = "Red";
    car.year = 1990;

    const carInserted = await carRepository.save(car);
    console.log("Car inserted: ", carInserted);
  })
  .catch(console.log);
