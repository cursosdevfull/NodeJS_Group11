export class UserEntity {
  fullName: string;
  email: string;
  password: string;
  area: string;

  constructor(fullName: string, email: string, password: string, area: string) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.area = area;
  }
}
