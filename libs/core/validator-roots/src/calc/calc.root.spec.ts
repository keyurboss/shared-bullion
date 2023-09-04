import { beforeEach, describe } from '@jest/globals';
import {
  rand,
  randNumber,
  randPastDate,
  randRecentDate,
  randUuid,
} from '@ngneat/falso';
import { CalculatedOnPriceof, CshID } from '@rps/bullion-interfaces';
import { CalcEntity, CalcEntityOptions } from './calc.root';

describe(CalcEntity.name, () => {
  let options: CalcEntityOptions;
  beforeEach(() => {
    options = {
      id: randUuid() as CshID,
      createdAt: randPastDate(),
      modifiedAt: randRecentDate(),
      variableSnapshot: {
        buy: {
          tcs: randNumber(),
          tds: randNumber(),
          premium: randNumber(),
          tax: randNumber({
            max: 10,
            min: 3,
          }),
        },
        sell: {
          tcs: randNumber(),
          tds: randNumber(),
          premium: randNumber(),
          tax: randNumber({
            max: 10,
            min: 3,
          }),
        },
      },
      type: rand(Object.values(CalculatedOnPriceof)),
    };
  });
  describe(CalcEntity.updateEntity.name, () => {
    test('Date is not Passed', () => {
      const entity = CalcEntity.updateEntity(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).toStrictEqual(options.id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Date is Passed', () => {
      const entity = CalcEntity.updateEntity(options, options.modifiedAt);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).toStrictEqual(options.id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).toStrictEqual(options.modifiedAt);
    });
  });
  describe(CalcEntity.createEntity.name, () => {
    test('No Id and Date is not Passed', () => {
      const entity = CalcEntity.createEntity(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).not.toStrictEqual(options.id);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Id is Passed', () => {
      const id = randUuid() as CshID;
      const entity = CalcEntity.createEntity(options, undefined, id);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).toStrictEqual(id);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Created Date and Id is Passed', () => {
      const id = randUuid() as CshID;
      const entity = CalcEntity.createEntity(options, options.createdAt, id);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).toStrictEqual(id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
  });

  describe(CalcEntity.from.name, () => {
    test('Common options', () => {
      const entity = CalcEntity.from(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.id).toStrictEqual(options.id);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).toStrictEqual(options.modifiedAt);
    });
  });
});
