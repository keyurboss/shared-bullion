import { describe } from '@jest/globals';
import {
  randBoolean,
  randPastDate,
  randRecentDate,
  randUrl,
  randUuid
} from '@ngneat/falso';

import {
  BullionId
} from '@rps/bullion-interfaces';
import {
  BullionSiteInfoOptions,
  BullionSiteInfoRoot,
} from './bullion-site-info.root';

describe(BullionSiteInfoRoot.name, () => {
  let options: BullionSiteInfoOptions;
  beforeEach(() => {
    options = {
      id: randUuid() as BullionId,
      domains: randUrl({
        length: 10,
      }),
      generalUserInfo: {
        autoApprove: randBoolean(),
        autoLogin: randBoolean(),
      },
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
    };
  });
  test(BullionSiteInfoRoot.from.name, () => {
    const entity = BullionSiteInfoRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
  test(BullionSiteInfoRoot.fromJson.name, () => {
    const entity = BullionSiteInfoRoot.fromJson(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
