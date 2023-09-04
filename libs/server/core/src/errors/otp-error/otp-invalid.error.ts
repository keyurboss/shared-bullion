import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class OtpInvalidError extends RESTApiReqError {
  constructor() {
    super(ErrorCode.OTP_INVALID, 'Invalid Otp');
  }
}
