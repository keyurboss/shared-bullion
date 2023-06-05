import { Opaque } from 'ts-essentials';

export type BullionId = Opaque<string, 'BullionId'>;

export type BullionGeneralUserConfig = {
  autoApprove: boolean;
  autoLogin: boolean;
};

export type BullionSiteInfo = {
  id: BullionId;
  name: string;
  domains: string[];
  generalUserInfo: BullionGeneralUserConfig;
};
