export interface UserEssentials {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;
  readonly roles: number[] | unknown[];
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
};

export class User {
  public readonly id: string;
  public name: string;
  public lastname: string;
  public email: string;
  public password: string;
  public roles: number[] | unknown[];
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;
  public refreshToken: string;

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
