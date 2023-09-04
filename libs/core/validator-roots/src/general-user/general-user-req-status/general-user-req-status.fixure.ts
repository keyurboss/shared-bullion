import { rand, randPastDate, randRecentDate, randUuid } from '@ngneat/falso';
import {
  BullionId,
  GeneralUserAuthStatus,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';
import { isNumber } from 'class-validator';
import {
  GeneralUserReqOptions,
  GeneralUserReqRoot,
} from './general-user-req-status.root';

export class GeneralUserReqFixtureFactory {
  static createMany(
    partialsOrCount: Array<PartialGeneralUserReqOptions> | number = 5,
  ): Array<GeneralUserReqRoot> {
    if (isNumber(partialsOrCount)) {
      return Array(partialsOrCount)
        .fill(null)
        .map(() => this.create());
    }

    return partialsOrCount.map((partial) => this.create(partial));
  }

  static create(partial?: PartialGeneralUserReqOptions): GeneralUserReqRoot {
    return GeneralUserReqRoot.from({
      id: randUuid() as GeneralUserReqId,
      bullionId: randUuid() as BullionId,
      generalUserId: randUuid() as GeneralUserId,
      status: rand(Object.values(GeneralUserAuthStatus)),
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
      ...partial,
    });
  }
}

export type PartialGeneralUserReqOptions = Partial<GeneralUserReqOptions>;
