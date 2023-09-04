import { ErrorCode } from '@rps/bullion-interfaces';
import { RESTApiReqError } from '../rest-api-req.error';

export class DoNotHaveAccessToAnyLocationIdError extends RESTApiReqError {
  constructor() {
    super(
      ErrorCode.DO_NOT_HAVE_ACCESS_TO_ANY_LOCATION_ID,
      'You do not have access to any location id',
    );
  }
}
