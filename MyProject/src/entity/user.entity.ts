import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Car } from './car.entity';

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true, type: "varchar" /* type: "text" */ })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  /*   @OneToOne((type) => Car, (car) => car.user, { cascade: true }) */
  // @OneToMany((type) => Car, (car) => car.user, { cascade: true })
  @ManyToMany((type) => Car, (car) => car.users, {
    cascade: true /* , eager: true */,
  })
  //cars: Promise<Car[]>;
  cars: Car[];
}
