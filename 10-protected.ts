class User {
  readonly userId: string = "f2ecb30c-4c85-4a98-9dd7-357f27b7e343";
  protected readonly password: string = "8MI81Y9zFN%!";
}

class UserDeveloper extends User {
  getUserId() {
    return this.userId;
  }

  compare(password: string) {
    this.match(password, this.password);
  }

  match(password: string, passwordCipher: string) {
    return false;
  }
}

const userDeveloper = new UserDeveloper();
console.log(userDeveloper.getUserId());
console.log(userDeveloper.userId);
//console.log(userDeveloper.password)
//userDeveloper.userId = "284e134e-9c67-4d3e-bb97-766b1161db48"
//console.log(userDeveloper.userId)
