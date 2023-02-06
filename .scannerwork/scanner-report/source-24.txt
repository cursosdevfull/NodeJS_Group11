import { NextFunction, Request, Response } from 'express';

import { TokenService } from '../services/token.service';

export class AuthenticationMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const headerAuthorization = req.headers.authorization;

    if (
      headerAuthorization &&
      headerAuthorization?.split(' ').length === 2 &&
      headerAuthorization?.split(' ')[0] === 'Bearer'
    ) {
      const token = headerAuthorization?.split(' ')[1];
      const tokenStatus = TokenService.validate(token);

      if (tokenStatus.status === 200) {
        res.locals.roles = tokenStatus.payload.roles;
        next();
      } else {
        res.status(tokenStatus.status).json({ message: tokenStatus.message });
      }
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
