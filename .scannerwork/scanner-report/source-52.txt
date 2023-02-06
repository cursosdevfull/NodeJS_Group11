export type UserRoleResult = { id: number; name: string }[];

export class UserOneResultApp {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly roles: UserRoleResult;
}

export class UserOneResultAppWithPassword extends UserOneResultApp {
  readonly password: string;
}
