import {
  GenerateExchangeBackwordCalcString,
  GenerateExchangeForwordCalcString,
} from './calc.functions';
describe('Tests GenerateExchangeForwordCalcString GenerateExchangeBackwordCalcString', () => {
  const params = {
    premium: 200,
    tax: 3,
  };
  const resultPrice = 51500;
  const basePrice = 49800;
  it(GenerateExchangeForwordCalcString.name, () => {
    const genString = GenerateExchangeForwordCalcString(params);
    expect(genString).toStrictEqual(
      `({{symbole}}+${params.premium})*(1+(${params.tax}/100))`,
    );
    expect(
      eval(genString.replace('{{symbole}}', basePrice.toString())),
    ).toStrictEqual(resultPrice);
  });
  it(GenerateExchangeBackwordCalcString.name, () => {
    const genString = GenerateExchangeBackwordCalcString(params);
    expect(genString).toStrictEqual(
      `({{price}}/(1+(${params.tax}/100)))-${params.premium}`,
    );
    expect(
      eval(genString.replace('{{price}}', resultPrice.toString())),
    ).toStrictEqual(basePrice);
  });
});
