import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';
import { HttpStatus } from '@nestjs/common';

export class InvalidPasswordError extends RESTApiReqError {
  constructor() {
    super(
      ErrorCode.INVALID_PASSWORD,
      'Invalid Password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
