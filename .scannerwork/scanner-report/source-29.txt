export enum StatusToken {
  TOKEN_VALID = 'TOKEN_VALID',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
}

export interface TokenStatus {
  status: number;
  message: StatusToken;
  payload?: any;
}
