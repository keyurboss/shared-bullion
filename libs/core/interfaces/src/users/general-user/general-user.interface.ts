import { Opaque } from 'ts-essentials';
import { BullionId } from '../../bullion';

export type GeneralUserId = Opaque<string, 'GENERAL_USER_ID'>;
export type DeviceId = Opaque<string, 'DEVICE_ID'>;
export type GstNumber = Opaque<string, 'GST_NUMBER'>;
export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  BROWSER = 'BROWSER',
}

export enum GeneralUserAuthStatus {
  Authorised = 'Authorised',
  Requested = 'Requested',
  Rejected = 'Rejected',
}
export interface GeneralUserType {
  id: GeneralUserId;
  bullionId: BullionId;
  firstName: string;
  lastName: string;
  firmName: string;
  status: GeneralUserAuthStatus;
  contactNumber: number;
  gstNumber: GstNumber;
  os: string;
  deviceId: DeviceId;
  deviceType: DeviceType;
  isAuto: boolean;
}
