import { NextFunction, Request, Response } from 'express';

export class AuthorizationMiddleware {
  build(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const roles = res.locals.roles;

      for (const roleAllowed of rolesAllowed) {
        if (roles.includes(roleAllowed)) {
          return next();
        }
      }

      res.status(403).json({ message: 'Forbidden' });
    };
  }
}
