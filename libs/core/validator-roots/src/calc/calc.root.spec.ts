import { beforeEach, describe } from '@jest/globals';
import { CalcEntity, CalcEntityOptions } from './calc.root';
import { faker } from '@faker-js/faker';
import { CalculatedOnPriceof, CshID } from '@rps/bullion-interfaces';

describe(CalcEntity.name, () => {
  let options: CalcEntityOptions;
  beforeEach(() => {
    options = {
      id: faker.datatype.uuid() as CshID,
      createdAt: faker.date.past(),
      modifiedAt: faker.date.recent(),
      variableSnapshot: {
        buy: {
          tcs: faker.number.int(),
          tds: faker.number.int(),
          premium: faker.number.int(),
          tax: faker.number.int({
            max: 10,
            min: 3,
          }),
        },
        sell: {
          tcs: faker.number.int(),
          tds: faker.number.int(),
          premium: faker.number.int(),
          tax: faker.number.int({
            max: 10,
            min: 3,
          }),
        },
      },
      type: faker.helpers.arrayElement<CalculatedOnPriceof>(
        Object.values(CalculatedOnPriceof)
      ),
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
      const id = faker.datatype.uuid() as CshID;
      const entity = CalcEntity.createEntity(options, undefined, id);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.type).toStrictEqual(options.type);
      expect(entity.variableSnapshot).toStrictEqual(options.variableSnapshot);
      expect(entity.id).toStrictEqual(id);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Created Date and Id is Passed', () => {
      const id = faker.datatype.uuid() as CshID;
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
