import { addMinutes } from 'date-fns';
import * as jwt from 'jwt-simple';
import yenv from 'yenv';

import { AuthApplicationDto } from '../dtos/auth.dto';

const env = yenv();

export class AuthService {
  static generateAccessToken(authDto: AuthApplicationDto): string {
    const createAccessTokenDate = new Date();
    const expireAccessTokenDate = addMinutes(
      createAccessTokenDate,
      env.JWT_EXPIRE_ACCESS_TOKEN
    );

    const payload = {
      name: authDto.name,
      lastname: authDto.lastname,
      roles: authDto.roles.map((role) => role.name),
      iat: createAccessTokenDate.getTime(),
      exp: expireAccessTokenDate.getTime(),
    };
    return jwt.encode(payload, env.JWT_SECRET);
  }
}
