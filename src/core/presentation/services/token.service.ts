import * as jwt from 'jwt-simple';
import yenv from 'yenv';

import { TOKEN_STATUS, TokenStatus } from '../utils/token-status.enum';

const env = yenv();

export class TokenService {
  static validate(token: string): TOKEN_STATUS {
    try {
      const payload = jwt.decode(token, env.JWT_SECRET);
      if (payload.exp < Date.now() / 1000) {
        return { status: 403, message: TokenStatus.TOKEN_EXPIRED };
      }
      return { status: 200, message: TokenStatus.TOKEN_VALID, payload };
    } catch (error) {
      return { status: 401, message: TokenStatus.TOKEN_INVALID };
    }
  }
}
