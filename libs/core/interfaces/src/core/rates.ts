export enum RateTypeKeys {
  'bid-high' = 'bid-high',
  'bid-low' = 'bid-low',
  'ask-high' = 'ask-high',
  'ask-low' = 'ask-low',
  'last-high' = 'last-high',
  'last-low' = 'last-low',
  bid = 'bid',
  ask = 'ask',
  open = 'open',
  close = 'close',
}
export type BaseSymbolePriceInterface = Record<RateTypeKeys, number>;
export const RateTypeKeysArray = Object.values(RateTypeKeys);

export enum RateBaseSymboles {
  HighLowColorType,
  GOLD = 'GOLD',
  GOLD_SPOT = 'GOLD_SPOT',
  GOLD_MCX = 'GOLD_MCX',
  SILVER = 'SILVER',
  SILVER_MCX = 'SILVER_MCX',
  SILVER_SPOT = 'SILVER_SPOT',
  INR = 'INR',
}
export const RateBaseSymbolesArray = Object.values(RateBaseSymboles);

export type SymboleWiseRate = Record<
  RateBaseSymboles,
  BaseSymbolePriceInterface
>;

export enum HighLowColorType {
  Red = 'Red',
  Green = 'Green',
  Default = 'Default',
}
