import { describe } from '@jest/globals';
import { randFirstName, randPastDate, randUuid } from '@ngneat/falso';
import { AdminId } from '@rps/bullion-interfaces';

import { AdminFixtureFactory, PartialAdminOptions } from './admin.fixture';
import { AdminRoot } from './admin.root';

describe(AdminFixtureFactory.name, () => {
  describe(AdminFixtureFactory.create.name, () => {
    test('with partial data', () => {
      const options: PartialAdminOptions = {
        id: randUuid() as AdminId,
        displayName: randFirstName(),
      };
      const entity = AdminFixtureFactory.create(options);
      expect(entity).toBeInstanceOf(AdminRoot);
      expect(entity).toStrictEqual(expect.objectContaining(options));
    });
    test('without any data', () => {
      const entity = AdminFixtureFactory.create();
      expect(entity).toBeInstanceOf(AdminRoot);
    });
  });
  describe(AdminFixtureFactory.createMany.name, () => {
    test('with number', () => {
      const entities = AdminFixtureFactory.createMany(6);
      expect(entities).toHaveLength(6);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(AdminRoot);
      });
    });
    test('with partial data', () => {
      const options: PartialAdminOptions[] = [
        {
          id: randUuid() as AdminId,
          displayName: randFirstName(),
        },
        {
          id: randUuid() as AdminId,
        },
        {
          displayName: randFirstName(),
          createdAt: randPastDate(),
        },
      ];
      const entities = AdminFixtureFactory.createMany(options);
      expect(entities).toHaveLength(options.length);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(AdminRoot);
      });
      options.forEach((option, index) => {
        expect(entities[index]).toStrictEqual(expect.objectContaining(option));
      });
    });
    test('without any data', () => {
      const entity = AdminFixtureFactory.create();
      expect(entity).toBeInstanceOf(AdminRoot);
    });
  });
});
