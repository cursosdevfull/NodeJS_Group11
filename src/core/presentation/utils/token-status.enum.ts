export enum TokenStatus {
  TOKEN_VALID = "TOKEN_VALID",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_INVALID = "TOKEN_INVALID",
}

export interface TOKEN_STATUS {
  status: number;
  message: TokenStatus;
  payload?: any;
}
