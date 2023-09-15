import { CreateGeneralUserRequestBody } from './create-general-user-request.body';

export type GetGeneralUserApprovalStatusBody = CreateGeneralUserRequestBody;
export type GetGeneralUserApprovalStatusResponse = {
  refreshToken: string;
  accessToken: string;
};
