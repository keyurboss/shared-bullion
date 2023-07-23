import { Opaque } from 'ts-essentials';

export type GeneralUserId = Opaque<string, 'GENERAL_USER_ID'>;
export type DeviceId = Opaque<string, 'DEVICE_ID'>;
export type GstNumber = Opaque<string, 'GST_NUMBER'>;
export enum DeviceType {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  BROWSER = 'BROWSER',
}

export interface IGeneralUserType {
  id: GeneralUserId;
  randomPass: string;
  firstName: string;
  lastName: string;
  firmName: string;
  contactNumber: number;
  gstNumber: GstNumber;
  os: string;
  deviceId: DeviceId;
  deviceType: DeviceType;
  isAuto: boolean;
}
