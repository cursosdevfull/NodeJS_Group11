class Database {
  static protocol: string = "http://";

  static getStringConnection(host: string, username: string, password: string) {
    return `${this.protocol}${host}/${username}:${password}`;
  }

  /*  getProtocol(): string {
        return this.protocol
    } */
}

/* const database = new Database()
console.log(database.getStringConnection("localhost", "jperez", "12345")) */

console.log(Database.getStringConnection("localhost", "jperez", "12345"));
