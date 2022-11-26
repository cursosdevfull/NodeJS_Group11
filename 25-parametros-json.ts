interface MedicProperties {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;
}

class Medic {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  specialty: string;
  subSpecialty: string;

  constructor(properties: MedicProperties) {
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.cmp = properties.cmp;
    this.email = properties.email;
    this.specialty = properties.specialty;
    this.subSpecialty = properties.subSpecialty;
  }
}

const properties: MedicProperties = {
  name: "Jorge",
  lastname: "Salinas",
  cmp: "12345",
  email: "jsalinas@correo.com",
  specialty: "Cardiología",
  subSpecialty: "Cardiología Geriátrica",
};

const medic = new Medic(properties);
console.log(medic);
