import { describe } from '@jest/globals';
import { randFirstName, randPastDate, randUuid } from '@ngneat/falso';
import { GeneralUserId } from '@rps/bullion-interfaces';

import {
  GeneralUserFixtureFactory,
  PartialGeneralUserOptions,
} from './general-user.fixture';
import { GeneralUserRoot } from './general-user.root';

describe(GeneralUserFixtureFactory.name, () => {
  describe(GeneralUserFixtureFactory.create.name, () => {
    test('with partial data', () => {
      const options: PartialGeneralUserOptions = {
        id: randUuid() as GeneralUserId,
        firstName: randFirstName(),
      };
      const entity = GeneralUserFixtureFactory.create(options);
      expect(entity).toBeInstanceOf(GeneralUserRoot);
      expect(entity).toStrictEqual(expect.objectContaining(options));
    });
    test('without any data', () => {
      const entity = GeneralUserFixtureFactory.create();
      expect(entity).toBeInstanceOf(GeneralUserRoot);
    });
  });
  describe(GeneralUserFixtureFactory.createMany.name, () => {
    test('with number', () => {
      const entities = GeneralUserFixtureFactory.createMany(6);
      expect(entities).toHaveLength(6);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(GeneralUserRoot);
      });
    });
    test('with partial data', () => {
      const options: PartialGeneralUserOptions[] = [
        {
          id: randUuid() as GeneralUserId,
          firstName: randFirstName(),
        },
        {
          id: randUuid() as GeneralUserId,
        },
        {
          firstName: randFirstName(),
          createdAt: randPastDate(),
        },
      ];
      const entities = GeneralUserFixtureFactory.createMany(options);
      expect(entities).toHaveLength(options.length);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(GeneralUserRoot);
      });
      options.forEach((option, index) => {
        expect(entities[index]).toStrictEqual(expect.objectContaining(option));
      });
    });
    test('without any data', () => {
      const entity = GeneralUserFixtureFactory.create();
      expect(entity).toBeInstanceOf(GeneralUserRoot);
    });
  });
});
