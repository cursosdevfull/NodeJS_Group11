import { Request, Response } from 'express';

import { UserRepository } from '../../users/domain/user.repository';
import { UserInfrastructure } from '../../users/infrastructure/user.infrastructure';
import { AuthApplication } from '../application/auth.application';

const userInfrastructure: UserRepository = new UserInfrastructure();
const authApplication = new AuthApplication(userInfrastructure);

class AuthController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const loginResult = await authApplication.login(email, password);

    if (loginResult.isErr()) {
      return response.status(loginResult.error.status).json({
        name: loginResult.error.name,
        message: loginResult.error.message,
      });
    }

    response.json(loginResult.value);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    const newAccessTokenResult = await authApplication.getNewAccessToken(
      refreshToken
    );

    if (newAccessTokenResult.isErr()) {
      return res.status(newAccessTokenResult.error.status).json({
        name: newAccessTokenResult.error.name,
        message: newAccessTokenResult.error.message,
      });
    }

    res.json(newAccessTokenResult.value);
  }
}

export default AuthController;
