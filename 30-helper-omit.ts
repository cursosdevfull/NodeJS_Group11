interface PatientEssentials {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

/* interface PatientUpdate {
    name: string
    lastname: string
} */

type PatientProperties = Required<PatientEssentials>;
type PatientPropertiesUpdate = Partial<Omit<PatientEssentials, "id email">>;

class Patient {
  private id: string;
  private name: string;
  private lastname: string;
  private email: string;

  constructor(properties: PatientProperties) {
    this.id = properties.id;
    this.name = properties.name;
    this.lastname = properties.lastname;
    this.email = properties.email;
  }

  update(updateFields: PatientPropertiesUpdate) {
    Object.assign(this, updateFields);
  }
}

const properties: PatientProperties = {
  id: "abcd",
  name: "Juan",
  lastname: "Pérez",
  email: "jperez@correo.com",
};
const patient = new Patient(properties);
console.log(patient);
const updateFields: PatientPropertiesUpdate = { lastname: "Salinas" };
patient.update(updateFields);
console.log(patient);
