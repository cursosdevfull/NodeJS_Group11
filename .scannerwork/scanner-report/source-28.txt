import * as jwt from 'jwt-simple';
import yenv from 'yenv';

import { StatusToken, TokenStatus } from '../utils/token-status.enum';

const env = yenv();

export class TokenService {
  static validate(token: string): TokenStatus {
    try {
      const payload = jwt.decode(token, env.JWT_SECRET);
      if (payload.exp < Date.now() / 1000) {
        return { status: 403, message: StatusToken.TOKEN_EXPIRED };
      }
      return { status: 200, message: StatusToken.TOKEN_VALID, payload };
    } catch (error) {
      return { status: 401, message: StatusToken.TOKEN_INVALID };
    }
  }
}
