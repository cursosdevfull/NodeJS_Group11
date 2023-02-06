export interface UserEssentials {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly roles: number[] | unknown[];
  readonly photo: string;
}

export interface UserOptionals {
  readonly active: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
  readonly refreshToken: string;
}

export type UserProperties = UserEssentials & Partial<UserOptionals>;

export type UserUpdateProperties = {
  readonly name: string;
  readonly lastname: string;
  password: string;
  roles: number[] | unknown[];
  refreshToken: string;
};

export class User {
  readonly id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: number[] | unknown[];
  active: boolean;
  readonly createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  refreshToken: string;
  photo: string;

  constructor(properties: UserProperties) {
    this.active = true;
    this.createdAt = new Date();
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      refreshToken: this.refreshToken,
      photo: this.photo,
    };
  }

  update(properties: Partial<UserUpdateProperties>): void {
    Object.assign(this, properties);
    this.updatedAt = new Date();
  }

  delete(): void {
    this.active = false;
    this.deletedAt = new Date();
  }
}
