import {
  rand,
  randBoolean,
  randFirstName,
  randLastName,
  randNumber,
  randPassword,
  randPastDate,
  randRecentDate,
  randText,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import {
  DeviceId,
  DeviceType,
  GeneralUserId,
  GstNumber,
} from '@rps/bullion-interfaces';
import { isNumber } from 'class-validator';
import { GeneralUserOptions, GeneralUserRoot } from './general-user.root';

export class GeneralUserFixtureFactory {
  static createMany(
    partialsOrCount: Array<PartialGeneralUserOptions> | number = 5,
  ): Array<GeneralUserRoot> {
    if (isNumber(partialsOrCount)) {
      return Array(partialsOrCount)
        .fill(null)
        .map(() => this.create());
    }

    return partialsOrCount.map((partial) => this.create(partial));
  }

  static create(partial?: PartialGeneralUserOptions): GeneralUserRoot {
    return GeneralUserRoot.from({
      contactNumber: randNumber(),
      randomPass: randPassword(),
      createdAt: randPastDate(),
      deviceId: randUuid() as DeviceId,
      deviceType: rand(Object.values(DeviceType)),
      firmName: randUserName(),
      firstName: randFirstName(),
      gstNumber: randText() as GstNumber,
      id: randUuid() as GeneralUserId,
      isAuto: randBoolean(),
      lastName: randLastName(),
      modifiedAt: randRecentDate(),
      os: randText(),
      ...partial,
    });
  }
}

export type PartialGeneralUserOptions = Partial<GeneralUserOptions>;
