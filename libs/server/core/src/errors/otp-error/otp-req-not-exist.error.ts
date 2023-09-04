import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class OtpReqNotExistError extends RESTApiReqError {
  constructor() {
    super(ErrorCode.OTP_REQ_NOT_EXIST, 'OTP Req Not Exist Please Request OTP');
  }
}
