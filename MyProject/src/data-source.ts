import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Car } from './entity/car.entity';
import { User } from './entity/user.entity';

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "12345",
  database: "cursonodejs",
  synchronize: true,
  logging: false,
  entities: [User, Car],
  migrations: [],
  subscribers: [],
});
