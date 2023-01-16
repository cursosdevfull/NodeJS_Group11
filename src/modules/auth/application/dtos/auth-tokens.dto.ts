export class AuthTokens {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string
  ) {}
}
