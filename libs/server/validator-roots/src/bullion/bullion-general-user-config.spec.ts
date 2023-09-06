import { describe } from '@jest/globals';
import { randBoolean } from '@ngneat/falso';

import {
  BullionGeneralUserConfigRoot,
  BullionGeneralUserConfigOption,
} from './bullion-general-user-config';

describe(BullionGeneralUserConfigRoot.name, () => {
  let options: BullionGeneralUserConfigOption;
  beforeEach(() => {
    options = {
      autoApprove: randBoolean(),
      autoLogin: randBoolean(),
    };
  });
  test(BullionGeneralUserConfigRoot.from.name, () => {
    const entity = BullionGeneralUserConfigRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
  test(BullionGeneralUserConfigRoot.fromJson.name, () => {
    const entity = BullionGeneralUserConfigRoot.fromJson(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
