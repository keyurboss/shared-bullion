import { describe } from '@jest/globals';
import { rand, randUuid } from '@ngneat/falso';
import {
  BullionId,
  GeneralUserAuthStatus,
  GeneralUserId,
  GeneralUserReqId,
} from '@rps/bullion-interfaces';

import {
  GeneralUserReqFixtureFactory,
  PartialGeneralUserReqOptions,
} from './general-user-req-status.fixure';
import { GeneralUserReqRoot } from './general-user-req-status.root';

describe(GeneralUserReqFixtureFactory.name, () => {
  describe(GeneralUserReqFixtureFactory.create.name, () => {
    test('with partial data', () => {
      const options: PartialGeneralUserReqOptions = {
        id: randUuid() as GeneralUserReqId,
        generalUserId: randUuid() as GeneralUserId,
        status: rand(Object.values(GeneralUserAuthStatus)),
      };
      const entity = GeneralUserReqFixtureFactory.create(options);
      expect(entity).toBeInstanceOf(GeneralUserReqRoot);
      expect(entity).toStrictEqual(expect.objectContaining(options));
    });
    test('without any data', () => {
      const entity = GeneralUserReqFixtureFactory.create();
      expect(entity).toBeInstanceOf(GeneralUserReqRoot);
    });
  });
  describe(GeneralUserReqFixtureFactory.createMany.name, () => {
    test('with number', () => {
      const entities = GeneralUserReqFixtureFactory.createMany(6);
      expect(entities).toHaveLength(6);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(GeneralUserReqRoot);
      });
    });
    test('with partial data', () => {
      const options: PartialGeneralUserReqOptions[] = [
        {
          id: randUuid() as GeneralUserReqId,
          bullionId: randUuid() as BullionId,
          generalUserId: randUuid() as GeneralUserId,
          status: rand(Object.values(GeneralUserAuthStatus)),
        },
        {
          bullionId: randUuid() as BullionId,
          status: rand(Object.values(GeneralUserAuthStatus)),
        },
        {
          generalUserId: randUuid() as GeneralUserId,
          status: rand(Object.values(GeneralUserAuthStatus)),
        },
      ];
      const entities = GeneralUserReqFixtureFactory.createMany(options);
      expect(entities).toHaveLength(options.length);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(GeneralUserReqRoot);
      });
      options.forEach((option, index) => {
        expect(entities[index]).toStrictEqual(expect.objectContaining(option));
      });
    });
    test('without any data', () => {
      const entity = GeneralUserReqFixtureFactory.create();
      expect(entity).toBeInstanceOf(GeneralUserReqRoot);
    });
  });
});
