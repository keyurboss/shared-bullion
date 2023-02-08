export enum RateTypeKeys {
  ask,
  bid,
  'bid-high',
  'bid-low',
  'ask-high',
  'ask-low',
  'last-high',
  'last-low',
  open,
  close,
}
export type BaseSymbolePriceInterface = Record<RateTypeKeys, number>;

export enum RateBaseSymboles {
  GOLD,
  GOLD_SPOT,
  GOLD_MCX,
  SILVER,
  SILVER_MCX,
  SILVER_SPOT,
  INR,
}

export type SymboleWiseRate = Record<
  RateBaseSymboles,
  BaseSymbolePriceInterface
>;
