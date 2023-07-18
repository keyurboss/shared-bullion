import { describe } from '@jest/globals';
import {
  rand,
  randBoolean,
  randCompanyName,
  randFullName,
  randNumber,
  randPastDate,
  randRecentDate,
  randSportsTeam,
  randUuid,
  randWord
} from '@ngneat/falso';

import {
  BullionId,
  DeviceId,
  DeviceType,
  GeneralUserAuthStatus,
  GeneralUserId,
  GstNumber,
} from '@rps/bullion-interfaces';

import { GeneralUserOptions, GeneralUserRoot } from './general-user.root';

describe(GeneralUserRoot.name, () => {
  let options: GeneralUserOptions;
  beforeEach(() => {
    options = {
      id: randUuid() as GeneralUserId,
      isAuto: randBoolean(),
      firmName: randFullName(),
      firstName: randFullName(),
      bullionId: randUuid() as BullionId,
      status: rand(Object.values(GeneralUserAuthStatus)),
      gstNumber: randCompanyName() as GstNumber,
      lastName: randFullName(),
      os: randSportsTeam(),
      contactNumber: randNumber(),
      deviceType: rand(Object.values(DeviceType)),
      deviceId: randWord() as DeviceId,
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
    };
  });
  test(GeneralUserRoot.from.name, () => {
    const entity = GeneralUserRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
  test(GeneralUserRoot.fromJson.name, () => {
    const entity = GeneralUserRoot.fromJson(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
