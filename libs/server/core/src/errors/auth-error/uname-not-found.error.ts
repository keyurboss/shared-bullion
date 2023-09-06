import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';
import { HttpStatus } from '@nestjs/common';

export class UserNameNotFoundError extends RESTApiReqError {
  constructor(uname = '') {
    super(
      ErrorCode.USER_NOT_FOUND,
      `Invalid Username - ${uname} not found`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
