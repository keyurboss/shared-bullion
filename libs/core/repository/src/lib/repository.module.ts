import { GeneralUserRepository } from './interface/general-user-repository.interface';
import { GeneralUserMongoRepository } from './mongo-repository/general-user-repository.mongo';

export const UserRepoProvider = {
  provide: GeneralUserRepository,
  useClass: GeneralUserMongoRepository,
};
