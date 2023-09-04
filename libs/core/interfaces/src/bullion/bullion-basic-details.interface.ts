import { Opaque } from 'ts-essentials';

export type BullionId = Opaque<string, 'BullionId'>;

export type IBullionGeneralUserConfig = {
  autoApprove: boolean;
  autoLogin: boolean;
};

export type IBullionSiteInfo = {
  id: BullionId;
  name: string;
  domains: string[];
  generalUserInfo: IBullionGeneralUserConfig;
  createdAt: Date;
  modifiedAt: Date;
};
