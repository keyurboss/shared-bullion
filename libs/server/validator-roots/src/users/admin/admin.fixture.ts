import {
  randFullName,
  randPassword,
  randPastDate,
  randRecentDate,
  randUserName,
  randUuid,
} from '@ngneat/falso';
import { AdminId, BullionId, UserRoles } from '@rps/bullion-interfaces';
import { isNumber } from 'class-validator';
import { AdminOptions, AdminRoot } from './admin.root';

export class AdminFixtureFactory {
  static createMany(
    partialsOrCount: Array<PartialAdminOptions> | number = 5,
  ): Array<AdminRoot> {
    if (isNumber(partialsOrCount)) {
      return Array(partialsOrCount)
        .fill(null)
        .map(() => this.create());
    }

    return partialsOrCount.map((partial) => this.create(partial));
  }

  static create(partial?: PartialAdminOptions): AdminRoot {
    return AdminRoot.from({
      id: randUuid() as AdminId,
      bullionId: randUuid() as BullionId,
      displayName: randFullName(),
      password: randPassword(),
      role: UserRoles.ADMIN,
      uname: randUserName(),
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
      ...partial,
    });
  }
}

export type PartialAdminOptions = Partial<AdminOptions>;
