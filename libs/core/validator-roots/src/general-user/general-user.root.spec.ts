import { describe } from '@jest/globals';
import { GeneralUserOptions, GeneralUserRoot } from './general-user.root';
import {
  randPastDate,
  randRecentDate,
  randWord,
  rand,
  randUuid,
  randBoolean,
  randNumber,
  randPhoneNumber,
  randFullName,
  randFlightNumber,
  randSportsTeam,
  randCompanyName,
} from '@ngneat/falso';
import {
  DeviceId,
  DeviceType,
  GeneralUserId,
  GstNumber,
} from '../../../interfaces/src';
import { FakeOptions } from '../../../../../node_modules/@ngneat/falso/lib/core/core';

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
