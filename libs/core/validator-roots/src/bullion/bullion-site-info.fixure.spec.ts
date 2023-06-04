import { describe } from '@jest/globals';
import { randPastDate, randUrl, randUuid } from '@ngneat/falso';
import { BullionId } from '@rps/bullion-interfaces';
import {
  BullionSiteInfoFixtureFactory,
  PartialBullionSiteInfoOptions,
} from './bullion-site-info.fixure';
import { BullionSiteInfoRoot } from './bullion-site-info.root';

describe(BullionSiteInfoFixtureFactory.name, () => {
  describe(BullionSiteInfoFixtureFactory.create.name, () => {
    test('with partial data', () => {
      const options: PartialBullionSiteInfoOptions = {
        id: randUuid() as BullionId,
        domains: randUrl({ length: 5 }),
      };
      const entity = BullionSiteInfoFixtureFactory.create(options);
      expect(entity).toBeInstanceOf(BullionSiteInfoRoot);
      expect(entity).toStrictEqual(expect.objectContaining(options));
    });
    test('without any data', () => {
      const entity = BullionSiteInfoFixtureFactory.create();
      expect(entity).toBeInstanceOf(BullionSiteInfoRoot);
    });
  });
  describe(BullionSiteInfoFixtureFactory.createMany.name, () => {
    test('with number', () => {
      const entities = BullionSiteInfoFixtureFactory.createMany(6);
      expect(entities).toHaveLength(6);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(BullionSiteInfoRoot);
      });
    });
    test('with partial data', () => {
      const options: PartialBullionSiteInfoOptions[] = [
        {
          id: randUuid() as BullionId,
          domains: randUrl({ length: 5 }),
        },
        {
          id: randUuid() as BullionId,
        },
        {
          createdAt: randPastDate(),
        },
      ];
      const entities = BullionSiteInfoFixtureFactory.createMany(options);
      expect(entities).toHaveLength(options.length);
      entities.forEach((entity) => {
        expect(entity).toBeInstanceOf(BullionSiteInfoRoot);
      });
      options.forEach((option, index) => {
        expect(entities[index]).toStrictEqual(expect.objectContaining(option));
      });
    });
    test('without any data', () => {
      const entity = BullionSiteInfoFixtureFactory.create();
      expect(entity).toBeInstanceOf(BullionSiteInfoRoot);
    });
  });
});
