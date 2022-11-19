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

  constructor(
    userInformationPersonal: UserInformationPersonal,
    salary: number
  ) {
    this.userInformationPersonal = userInformationPersonal;
    this.salary = salary;
  }
}

const userInformationPersonal = new UserInformationPersonal(
  "Sergio",
  "Hidalgo"
);
const userSalary = new UserSalary(userInformationPersonal, 2000);
console.log("userSalary", userSalary);
