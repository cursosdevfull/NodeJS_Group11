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
  private _salary: number;
  userInformationPersonal: UserInformationPersonal;

  constructor(
    userInformationPersonal: UserInformationPersonal,
    salary: number
  ) {
    this.userInformationPersonal = userInformationPersonal;
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  set salary(newSalary: number) {
    this._salary = newSalary;
  }
}

const userInformationPersonal = new UserInformationPersonal(
  "Sergio",
  "Hidalgo"
);
const userSalary = new UserSalary(userInformationPersonal, 2000);

console.log("salary", userSalary.salary);

userSalary.salary = 5000;

console.log("salary", userSalary.salary);
