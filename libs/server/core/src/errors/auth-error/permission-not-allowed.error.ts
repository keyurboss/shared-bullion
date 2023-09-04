import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';
import { HttpStatus } from '@nestjs/common';

export class PermissionNotAllowedError extends RESTApiReqError {
  constructor() {
    super(
      ErrorCode.PERMISSION_NOT_ALLOWED,
      'You do not have permmision to access this resource',
      HttpStatus.FORBIDDEN,
    );
  }
}
