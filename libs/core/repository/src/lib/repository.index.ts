import { Provider } from '@nestjs/common';
import { BullionSiteInfoRepository, GeneralUserRepository } from './interface';

import {
  BullionSiteInfoMongoRepository,
  GeneralUserMongoRepository,
} from './mongo-repository';

export const GeneralUserRepoProvider: Provider = {
  provide: GeneralUserRepository,
  useClass: GeneralUserMongoRepository,
};
export const BullionSiteInfoRepoProvider: Provider = {
  provide: BullionSiteInfoRepository,
  useClass: BullionSiteInfoMongoRepository,
};
