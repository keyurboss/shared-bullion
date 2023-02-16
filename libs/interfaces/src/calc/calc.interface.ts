// (((({{symbole}}+{{sprem}})*{{conv}}*{{INR}})+{{duty}}+{{margin}})*(1+({{tax}}/100))/{{div}}*{{mult}})

import { Opaque } from 'ts-essentials';



export type CshID = Opaque<string, 'CshID'>;
export enum CshType {
  fixed = 'fixed',
  exec = 'exec',
}
export type CshPremiumBuySellSnapshot = {
  tax: number;
  tcs: number;
  tds: number;
  premium: number;
};
export type CshVariableSnapshot = {
  buy: CshPremiumBuySellSnapshot;
  sell: CshPremiumBuySellSnapshot;
};

export type CshGenStrings = {
  buy: string;
  sell: string;
};
