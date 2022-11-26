interface IUser {
  name: string;
  id: number;
}

interface IUser2 {
  name: string;
  lastname: string;
}

function getUserByUsername(username: string): IUser {
  return { name: "Sergio", id: 10 };
}

function getUserById(id: number): IUser2 {
  return { name: "Sergio", lastname: "Hidalgo" };
}

function getUser<ParameterType, ReturnType>(
  parameter: ParameterType
): ReturnType {}

/* const user = getUserByUsername("shidalgo")
const user2 = getUserById(10)
 */
const user = getUser<string, IUser>("shidalgo");
const user2 = getUser<number, IUser2>(10);

console.log(user);
console.log(user2);
