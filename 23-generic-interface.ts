interface BaseRepository<Entity> {
  insert(entity: Entity): Entity;
  update(id: number, entity: Entity): Entity;
  delete(entity: Entity): Entity;
}

interface MedicRepository extends BaseRepository<Medic> {
  findByEntity(entity: Medic): Medic;
}

class Medic {
  name: string;
  lastname: string;
  cmp: string;

  constructor(name: string, lastname: string, cmp: string) {
    this.name = name;
    this.lastname = lastname;
    this.cmp = cmp;
  }
}

class MedicOperation implements MedicRepository {
  findByEntity(entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
  insert(entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
  update(id: number, entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
  delete(entity: Medic): Medic {
    throw new Error("Method not implemented.");
  }
}

class Driver {
  name: string;
  lastname: string;
  license: string;

  constructor(name: string, lastname: string, license: string) {
    this.name = name;
    this.lastname = lastname;
    this.license = license;
  }
}

class DriverOperation implements BaseRepository<Driver> {
  insert(entity: Driver): Driver {
    throw new Error("Method not implemented.");
  }
  update(id: number, entity: Driver): Driver {
    throw new Error("Method not implemented.");
  }
  delete(entity: Driver): Driver {
    throw new Error("Method not implemented.");
  }
}

const medic = new Medic("Juan", "Pérez", "12345");
const driver = new Driver("Jorge", "Salinas", "abc-12345");

const medicOperation: BaseRepository<Medic> = new MedicOperation();
const driverOperation: BaseRepository<Driver> = new DriverOperation();

console.log(medicOperation.insert(medic));
console.log(driverOperation.insert(driver));
