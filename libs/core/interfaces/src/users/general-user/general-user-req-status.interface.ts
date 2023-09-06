import { Opaque } from 'ts-essentials';
import { BullionId } from '../../bullion';
import { IBaseEntity } from '../base-entity.interface';
import { GeneralUserId } from './general-user.interface';

export type GeneralUserReqId = Opaque<string, 'GENERAL_USER_REQ_ID'>;

export enum GeneralUserAuthStatus {
  Authorized = 'Authorized',
  Requested = 'Requested',
  Rejected = 'Rejected',
}
export interface IGeneralUserReq extends IBaseEntity<GeneralUserReqId> {
  generalUserId: GeneralUserId;
  bullionId: BullionId;
  status: GeneralUserAuthStatus;
}
