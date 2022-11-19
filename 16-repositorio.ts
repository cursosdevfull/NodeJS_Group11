class User {
  /*  name: string
     lastname: string 
 
     constructor(name: string, lastname: string){
         this.name = name
         this.lastname = lastname
     } */

  constructor(public name: string, public lastname: string) {}
}
interface UserRepository {
  insert(user: User): User;
  getAll(): User[];
}

class UserInfrastructure implements UserRepository {
  insert(user: User): User {
    console.log(user);
    return user;
  }

  trace(user: User) {
    console.log(user);
  }

  getAll(): User[] {
    return [new User("Luis", "Lamas"), new User("Rosa", "Luque")];
  }
}

class UserApplication {
  userInfrastructure: UserRepository;

  constructor(userInfrastructure: UserRepository) {
    this.userInfrastructure = userInfrastructure;
  }

  addUser(user: User) {
    this.userInfrastructure.insert(user);
  }
}

const userInfrastructure = new UserInfrastructure();
const userApplication = new UserApplication(userInfrastructure);

const user = new User("Jorge", "Avila");
userApplication.addUser(user);
