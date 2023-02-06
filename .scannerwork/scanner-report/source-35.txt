export type AuthRoles = { id: number; name: string };

export class AuthApplicationDto {
  id: string;
  name: string;
  lastname: string;
  roles: AuthRoles[];
  password: string;
  refreshToken: string;
}
