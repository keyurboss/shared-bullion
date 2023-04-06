import { beforeEach, describe } from '@jest/globals';
import { CalcEntity, CalcEntityOptions } from './calc.root';
import { faker } from '@faker-js/faker';
import { CalculatedOnPriceof, CshID } from '../../../interfaces/src';

describe(CalcEntity.name, () => {
  let options: CalcEntityOptions;
  beforeEach(() => {
    options = {
      Id: faker.datatype.uuid() as CshID,
      createdAt: faker.date.past(),
      modifiedAt: faker.date.recent(),
      VariableSnapshot: {
        buy: {
          premium: faker.datatype.number(),
          tax: faker.datatype.number({
            max: 10,
            min: 3,
          }),
        },
        sell: {
          premium: faker.datatype.number(),
          tax: faker.datatype.number({
            max: 10,
            min: 3,
          }),
        },
      },
      Type: faker.helpers.arrayElement<CalculatedOnPriceof>(
        Object.values(CalculatedOnPriceof)
      ),
    };
  });
  describe(CalcEntity.updateEntity.name, () => {
    test('Date is not Passed', () => {
      const entity = CalcEntity.updateEntity(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.Id).toStrictEqual(options.Id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Date is Passed', () => {
      const entity = CalcEntity.updateEntity(options, options.modifiedAt);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.Id).toStrictEqual(options.Id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).toStrictEqual(options.modifiedAt);
    });
  });
  describe(CalcEntity.createEntity.name, () => {
    test('No Id and Date is not Passed', () => {
      const entity = CalcEntity.createEntity(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.Id).not.toStrictEqual(options.Id);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Id is Passed', () => {
      const id = faker.datatype.uuid() as CshID;
      const entity = CalcEntity.createEntity(options, undefined, id);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.Id).toStrictEqual(id);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
    test('Created Date and Id is Passed', () => {
      const id = faker.datatype.uuid() as CshID;
      const entity = CalcEntity.createEntity(options, options.createdAt, id);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.Id).toStrictEqual(id);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
  });

  describe(CalcEntity.from.name, () => {
    test('Common options', () => {
      const entity = CalcEntity.from(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Id).toStrictEqual(options.Id);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.createdAt).toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).toStrictEqual(options.modifiedAt);
    });
  });
});
