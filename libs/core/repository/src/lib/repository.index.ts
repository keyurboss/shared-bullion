import { Provider } from '@nestjs/common';
import { GeneralUserRepository } from './interface/general-user/general-user-repository.interface';
import { GeneralUserMongoRepository } from './mongo-repository/general-user/general-user-repository.mongo';

export const GeneralUserRepoProvider: Provider = {
  provide: GeneralUserRepository,
  useClass: GeneralUserMongoRepository,
};
