import { describe } from '@jest/globals';
import {
  rand,
  randBoolean,
  randCompanyName,
  randFullName,
  randPastDate,
  randPhoneNumber,
  randRecentDate,
  randSportsTeam,
  randUuid,
  randWord
} from '@ngneat/falso';
import { FakeOptions } from '@ngneat/falso/lib/core/core';

import {
  DeviceId,
  DeviceType,
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
      gstNumber: randCompanyName() as GstNumber,
      lastName: randFullName(),
      os: randSportsTeam(),
      contactNumber: +randPhoneNumber<FakeOptions>({
        length: 10,
      }),
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
    const entity = GeneralUserRoot.from(options);
    expect(entity).toStrictEqual(expect.objectContaining({ ...options }));
  });
});
