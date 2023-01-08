export type AuthRoles = { id: number; name: string };

export class AuthApplicationDto {
  name: string;
  lastname: string;
  roles: AuthRoles[];
}
