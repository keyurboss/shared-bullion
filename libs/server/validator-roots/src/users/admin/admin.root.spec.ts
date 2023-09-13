import { describe } from '@jest/globals';
import {
  randFullName,
  randPassword,
  randPastDate,
  randRecentDate,
  randUserName,
  randUuid,
} from '@ngneat/falso';

import { AdminId, BullionId, UserRoles } from '@rps/bullion-interfaces';

import { AdminOptions, AdminRoot } from './admin.root';

describe(AdminRoot.name, () => {
  let options: AdminOptions;
  beforeEach(() => {
    options = {
      id: randUuid() as AdminId,
      bullionId: randUuid() as BullionId,
      displayName: randFullName(),
      password: randPassword(),
      role: UserRoles.ADMIN,
      uname: randUserName(),
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
    };
  });
  test(AdminRoot.from.name, () => {
    const entity = AdminRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
  test(AdminRoot.fromJson.name, () => {
    const entity = AdminRoot.fromJson(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
