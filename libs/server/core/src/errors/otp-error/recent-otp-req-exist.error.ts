import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class RecentOtpReqExistError extends RESTApiReqError {
  constructor() {
    super(
      ErrorCode.RECENT_OTP_REQ_EXIST,
      'You have requested OTP in last 60 seconds',
    );
  }
}
