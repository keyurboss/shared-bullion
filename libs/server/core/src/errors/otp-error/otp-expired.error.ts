import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class OtpExpiredError extends RESTApiReqError {
  constructor() {
    super(ErrorCode.OTP_EXPIRED, 'OTP Expired');
  }
}
