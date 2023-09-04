import { Provider } from '@nestjs/common';
import {
  BullionSiteInfoRepository,
  GeneralUserRepository,
  GeneralUserReqRepository,
} from './interface';

import {
  BullionSiteInfoMongoRepository,
  GeneralUserMongoRepository,
  GeneralUserReqMongoRepository,
} from './mongo-repository';

export const GeneralUserRepoProvider: Provider = {
  provide: GeneralUserRepository,
  useClass: GeneralUserMongoRepository,
};

export const GeneralUserReqRepoProvider: Provider = {
  provide: GeneralUserReqRepository,
  useClass: GeneralUserReqMongoRepository,
};

export const BullionSiteInfoRepoProvider: Provider = {
  provide: BullionSiteInfoRepository,
  useClass: BullionSiteInfoMongoRepository,
};
