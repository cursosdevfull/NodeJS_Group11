const information = {
  address: "av. La Unión 254",
};

information.address = "Jr. Alfonso 345";

class User {
  private readonly userId: string;
  private email: string;
  private name: string;
  private age: number;

  constructor(userId: string, name: string, age: number, email: string) {
    this.userId = userId;
    this.name = name;
    this.age = age;
    this.email = email;
    information.address = "calle Los Pescadores 123";
  }

  update(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  /* register(userId: string) {
        this.userId = userId
    } */
}

const user = new User(
  "11fb907f-6615-4df9-a5dc-2d6ddb794d64",
  "Sergio",
  23,
  "shidalgo@correo.com"
);
//user.register("f2ecb30c-4c85-4a98-9dd7-357f27b7e343")
user.update("Javier", 20, "email@email.com");
console.log("user", user);
