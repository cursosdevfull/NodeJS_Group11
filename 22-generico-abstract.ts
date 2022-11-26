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

abstract class AbstractMedic {
  insert(medic: Medic): Medic {
    return medic;
  }

  update(id: number, medic: Medic): Medic {
    return medic;
  }

  delete(medic: Medic): Medic {
    return medic;
  }
}

abstract class AbstractDriver {
  insert(driver: Driver): Driver {
    return driver;
  }

  update(id: number, driver: Driver): Driver {
    return driver;
  }

  delete(driver: Driver): Driver {
    return driver;
  }
}

abstract class AbstractEntity<Entity> {
  insert(entity: Entity): Entity {
    return entity;
  }

  update(id: number, entity: Entity): Entity {
    return entity;
  }

  delete(entity: Entity): Entity {
    return entity;
  }
}

class MedicOperation extends AbstractEntity<Medic> {}

class DriverOperation extends AbstractEntity<Driver> {}

const medic = new Medic("Juan", "Pérez", "12345");
const driver = new Driver("Jorge", "Salinas", "abc-12345");

const medicOperation = new MedicOperation();
const driverOperation = new DriverOperation();

console.log(medicOperation.insert(medic));
console.log(driverOperation.insert(driver));
