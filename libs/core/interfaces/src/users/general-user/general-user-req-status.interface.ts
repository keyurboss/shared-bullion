import { Opaque } from 'ts-essentials';
import { BullionId } from '../../bullion';
import { GeneralUserId } from './general-user.interface';

export type GeneralUserReqId = Opaque<string, 'GENERAL_USER_REQ_ID'>;

export enum GeneralUserAuthStatus {
  Authorised = 'Authorised',
  Requested = 'Requested',
  Rejected = 'Rejected',
}
export interface IGeneralUserReq {
  id: GeneralUserReqId;
  generalUserId: GeneralUserId;
  bullionId: BullionId;
  status: GeneralUserAuthStatus;
  createdAt: Date;
  modifiedAt: Date;
}
