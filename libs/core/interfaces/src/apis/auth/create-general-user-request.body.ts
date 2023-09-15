import { BullionId } from '../../bullion';
import { RegisterNewGeneralUserResponse } from './general-user-register-user.body';

export type CreateGeneralUserRequestBody = {
  token: string;
  bullionId: BullionId;
};
export type CreateGeneralUserRequestResponse = RegisterNewGeneralUserResponse;
