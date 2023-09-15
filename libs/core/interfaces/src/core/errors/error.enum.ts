export enum ErrorCode {
  ENTITY_NOT_FOUND = 100,
  OTP_EXPIRED = 201,
  OTP_INVALID = 202,
  OTP_REQ_NOT_EXIST = 203,
  RECENT_OTP_REQ_EXIST = 204,
  INVALID_TOKEN_SIGNATURE = 205,
  TOKEN_EXPIRED = 206,
  TOKEN_NOT_BEFORE = 207,
  ROLE_NOT_EXISTS = 208,
  ROLE_NOT_AUTHORIZED = 209,
  USER_NOT_FOUND = 210,
  INVALID_PASSWORD = 211,
  DO_NOT_HAVE_ACCESS_TO_ANY_LOCATION_ID = 212,
  PERMISSION_NOT_ALLOWED = 213,
  INVALID_INPUT = 214,
  GENERAL_USER_REQ_NOT_FOUND = 215,
  GENERAL_USER_REQ_REJECTED = 216,
  GENERAL_USER_REQ_PENDING = 217,
  GENERAL_USER_REQ_EXISTS = 218,
}
