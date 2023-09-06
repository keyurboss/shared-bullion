import { describe } from '@jest/globals';
import { rand, randPastDate, randRecentDate, randUuid } from '@ngneat/falso';

import {
  BullionId,
  GeneralUserAuthStatus,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';

import {
  GeneralUserReqOptions,
  GeneralUserReqRoot,
} from './general-user-req-status.root';

describe(GeneralUserReqRoot.name, () => {
  let options: GeneralUserReqOptions;
  beforeEach(() => {
    options = {
      id: randUuid() as GeneralUserReqId,
      bullionId: randUuid() as BullionId,
      generalUserId: randUuid() as GeneralUserId,
      status: rand(Object.values(GeneralUserAuthStatus)),
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
    };
  });
  test(GeneralUserReqRoot.from.name, () => {
    const entity = GeneralUserReqRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
  test(GeneralUserReqRoot.fromJson.name, () => {
    const entity = GeneralUserReqRoot.fromJson(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
