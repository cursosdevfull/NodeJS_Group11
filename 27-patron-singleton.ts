class Database {
  private host: string;
  private username: string;
  private password: string;

  static instance: Database;

  private constructor(host: string, username: string, password: string) {
    this.host = host;
    this.username = username;
    this.password = password;
  }

  static create(host: string, username: string, password: string): Database {
    if (!this.instance) {
      this.instance = new Database(host, username, password);
    }
    return this.instance;
  }
}

const connection1 = Database.create("localhost", "user01", "12345");
console.log(connection1);
const connection2 = Database.create("localhost:5000", "user02", "12345");
console.log(connection2);
