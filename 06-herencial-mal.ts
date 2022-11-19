class UserInformationPersonal {
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

class UserSalary extends UserInformationPersonal {
  salary: number;

  constructor(name: string, lastname: string, salary: number) {
    super(name, lastname);
    this.salary = salary;
  }
}

const userSalary = new UserSalary("Sergio", "Hidalgo", 2000);
console.log("userSalary", userSalary);
