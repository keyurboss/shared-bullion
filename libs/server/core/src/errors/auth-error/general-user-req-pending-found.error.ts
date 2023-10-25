import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class GeneralUserReqPending extends RESTApiReqError {
  constructor() {
    super(ErrorCode.GENERAL_USER_REQ_PENDING, 'Request Status Pending');
  }
}
