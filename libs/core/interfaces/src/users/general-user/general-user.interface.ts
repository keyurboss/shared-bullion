import { Opaque } from 'ts-essentials';

export type GeneralUserId = Opaque<string, 'GENERAL_USER_ID'>;
export type DeviceId = Opaque<string, 'DEVICE_ID'>;
export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  BROWSER = 'BROWSER',
}
export interface GeneralUserType {
  id: GeneralUserId;
//   bullionId?:str
  firstName?: string;
  lastName?: string;
  firmName?: string;
  contactNumber?: string;
  gstNumber?: string;
  deviceId: DeviceId;
  deviceType: DeviceType;
  isAuto: boolean;
}
