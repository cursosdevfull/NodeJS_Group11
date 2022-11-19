class UserInformationPersonal {
  name: string;
  lastname: string;

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

class UserPeruvian extends UserInformationPersonal {
  nationality: string = "Peruvian";
}

class UserSalary {
  salary: number;
  userInformationPersonal: UserInformationPersonal;

  constructor(name: string, lastname: string, salary: number) {
    this.userInformationPersonal = new UserInformationPersonal(name, lastname);
    this.salary = salary;
  }
}

const userSalary = new UserSalary("Sergio", "Hidalgo", 2000);
console.log("userSalary", userSalary);
