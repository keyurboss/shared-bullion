import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';
import { HttpStatus } from '@nestjs/common';

export class RolesNotAuthorizedError extends RESTApiReqError {
  constructor() {
    super(
      ErrorCode.ROLE_NOT_AUTHORIZED,
      'You Do not have sufficient permission to access this resource',
      HttpStatus.FORBIDDEN,
    );
  }
}
