interface UserProperties {
  userId: string;
  name: string;
  lastname: string;
  age?: number;
  gender?: boolean;
  email: string;
  tall?: number;
}

class User {
  private readonly userId: string;
  private name: string;
  private lastname: string;
  private age: number;
  private gender: boolean;
  private readonly email: string;
  private tall: number;

  constructor(properties: UserProperties) {
    Object.assign(this, properties);
    //Object.assign({name: "Claudia", age: 34}, {name: "Luisa", lastname: "Tamayo"})
    // {name: "Luisa", lastname: "Tamayo", age: 34}

    /* this.userId = properties.userId
        this.name = properties.name
        this.lastname = properties.lastname
        this.age = properties.age
        this.gender = properties.gender
        this.email = properties.email
        this.tall = properties.tall */
  }
}

//const properties: UserProperties = { userId: "284e134e-9c67-4d3e-bb97-766b1161db48", name: "Alicia", lastname: "Montes", age: 30, gender: false, email: "alicia@correo.com", tall: 180 }
const properties: UserProperties = {
  userId: "284e134e-9c67-4d3e-bb97-766b1161db48",
  name: "Alicia",
  lastname: "Montes",
  age: 30,
  email: "alicia@correo.com",
};
const user = new User(properties);
console.log(user);
