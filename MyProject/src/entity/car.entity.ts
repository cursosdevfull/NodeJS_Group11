import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity({ name: "car" })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  brand: string;

  @Column({ type: "varchar", length: 50 })
  model: string;

  @Column({ type: "varchar", length: 50 })
  color: string;

  @Column({ type: "int" })
  year: number;

  /*   @OneToOne((type) => User, (user) => user.car)
  @JoinColumn() */
  // @ManyToOne((type) => User, (user) => user.cars)
  @ManyToMany((type) => User, (user) => user.cars)
  @JoinTable()
  //users: Promise<User[]>;
  users: User[];
}
