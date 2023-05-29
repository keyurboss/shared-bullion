import { CshPremiumBuySellSnapshot } from './calc.interface';

const ForwordExchangeBaseString = '({{symbole}}+{{premium}})*(1+({{tax}}/100))';
const BackwordExchangeBaseString = '({{price}}/(1+({{tax}}/100)))-{{premium}}';

export function GenerateExchangeForwordCalcString(d: Record<string, number>) {
  return Object.keys(d).reduce((pv, cv) => {
    return pv.replace(new RegExp(`{{${cv}}}`, 'gmi'), (d[cv] ?? 0).toString());
  }, ForwordExchangeBaseString);
}
export function GenerateExchangeBackwordCalcString(d: Record<string, number>) {
  return Object.keys(d).reduce((pv, cv) => {
    return pv.replace(new RegExp(`{{${cv}}}`, 'gmi'), (d[cv] ?? 0).toString());
  }, BackwordExchangeBaseString);
}

export abstract class CalcFunctionClass {
  abstract ExchangePriceCalculation(
    base_price: number,
    snapshot: CshPremiumBuySellSnapshot
  ): number;
  abstract FixedPriceCalculation(snapshot: CshPremiumBuySellSnapshot): number;
  abstract BankPricePriceCalculation(
    base_price: number,
    snapshot: CshPremiumBuySellSnapshot
  ): // INR_PRICE:
  number;
}

export class DefaultCalcFunction extends CalcFunctionClass {
  ExchangePriceCalculation(
    base_price: number,
    snapshot: CshPremiumBuySellSnapshot
  ): number {
    let price = base_price ?? 0;
    if (snapshot.premium) {
      price += snapshot.premium;
    }
    if (snapshot.tax) {
      price *= 1 + snapshot.tax / 100;
    }
    return price;
  }
  FixedPriceCalculation(snapshot: CshPremiumBuySellSnapshot): number {
    return this.ExchangePriceCalculation(0, snapshot);
  }

  BankPricePriceCalculation(
    // base_price: number,
    // snapshot: CshPremiumBuySellSnapshot
  ): number {
    return 0;
  }
}
