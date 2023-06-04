import {
  randBoolean,
  randPastDate,
  randRecentDate,
  randUrl,
  randUuid,
} from '@ngneat/falso';
import { BullionId } from '@rps/bullion-interfaces';
import { isNumber } from 'class-validator';
import {
  BullionSiteInfoOptions,
  BullionSiteInfoRoot,
} from './bullion-site-info.root';

export class BullionSiteInfoFixtureFactory {
  static createMany(
    partialsOrCount: Array<PartialBullionSiteInfoOptions> | number
  ): Array<BullionSiteInfoRoot> {
    if (isNumber(partialsOrCount)) {
      return Array(partialsOrCount)
        .fill(null)
        .map(() => this.create());
    }

    return partialsOrCount.map((partial) => this.create(partial));
  }

  static create(partial?: PartialBullionSiteInfoOptions): BullionSiteInfoRoot {
    return BullionSiteInfoRoot.from({
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
      ...partial,
    });
  }
}

export type PartialBullionSiteInfoOptions = Partial<BullionSiteInfoOptions>;
