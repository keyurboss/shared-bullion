import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class InvalidBodyError extends RESTApiReqError {
  constructor(message: string) {
    super(ErrorCode.INVALID_INPUT, message);
  }
}
