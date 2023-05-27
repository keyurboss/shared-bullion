import { GeneralUserId } from '@rps/bullion-interfaces';
import { GeneralUserMongoRepository } from './general-user-repository.mongo';
import { randUuid } from '@ngneat/falso';

describe(GeneralUserMongoRepository.name, () => {
  let userId: GeneralUserId;
  let userIds: GeneralUserId[];

  beforeEach(() => {
    userId = randUuid() as GeneralUserId;
    userIds = Array(5)
      .fill(null)
      .map(() => randUuid() as GeneralUserId);

    
  });
});
