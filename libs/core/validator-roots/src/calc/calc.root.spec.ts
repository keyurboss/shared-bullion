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
  describe(CalcEntity.createEntity.name, () => {
    test('No Id and Date is Passed', () => {
      const entity = CalcEntity.createEntity(options);
      expect(entity).toBeInstanceOf(CalcEntity);
      expect(entity.Type).toStrictEqual(options.Type);
      expect(entity.VariableSnapshot).toStrictEqual(options.VariableSnapshot);
      expect(entity.createdAt).not.toStrictEqual(options.createdAt);
      expect(entity.modifiedAt).not.toStrictEqual(options.modifiedAt);
    });
  });
});
