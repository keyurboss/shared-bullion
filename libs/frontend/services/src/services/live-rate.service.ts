import { InjectionToken, WritableSignal, signal } from '@angular/core';

import {
  BaseSymbolPriceInterface,
  EnvInterface,
  HighLowColorType,
  RateBaseSymbols,
  RateBaseSymbolsArray,
  RateTypeKeys,
  RateTypeKeysArray,
  SymbolWiseRate,
} from '@rps/bullion-interfaces';

import { JsonToIterable } from '../core';

export type RateSignalDataType = Record<
  RateTypeKeys,
  {
    rate: number;
    color?: HighLowColorType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeOutRef: null | any;
  }
>;
export const InjectableRate = new InjectionToken<SymbolWiseRate>(
  'Insert Current Price',
);

export abstract class LiveRateService {
  RateSignal$: Record<RateBaseSymbols, WritableSignal<RateSignalDataType>> =
    {} as never;

  protected _LastRate: Map<RateBaseSymbols, BaseSymbolPriceInterface> =
    new Map();

  get LastRate(): Map<RateBaseSymbols, BaseSymbolPriceInterface> {
    return this._LastRate;
  }

  protected set LastRate(
    value: Map<RateBaseSymbols, BaseSymbolPriceInterface>,
  ) {
    this._LastRate = value;
    this.setRate(value);
  }

  protected RatesReadySignal = signal(false);
  RatesReady$ = this.RatesReadySignal.asReadonly();

  get RatesReady() {
    return this.RatesReady$();
  }

  protected set RatesReady(value) {
    this.RatesReadySignal.set(value);
  }

  constructor(
    lastRate: SymbolWiseRate,
    envVariable: EnvInterface,
    initializeService = true,
  ) {
    this.CreateSignals();
    if (lastRate !== null && typeof lastRate !== 'undefined') {
      this.LastRate = new Map(JsonToIterable(lastRate));
      this.RatesReady = true;
    }
    if (
      envVariable !== null &&
      typeof lastRate !== 'undefined' &&
      envVariable.is_server
    ) {
      return;
    }
    if (initializeService) {
      this.init();
    }
  }

  private async init() {
    if (this.RatesReady === false) {
      await this.getLastRates().then((rate) => {
        this.LastRate = new Map(JsonToIterable(rate));
        this.RatesReady = true;
      });
    }
    this.InitRemoteConnection();
  }

  setRate(Rate: Map<RateBaseSymbols, Partial<BaseSymbolPriceInterface>>) {
    for (const [symbol, incomingRate] of Rate) {
      if (typeof this._LastRate.get(symbol) === 'undefined') {
        this._LastRate.set(symbol, incomingRate as BaseSymbolPriceInterface);
        continue;
      }

      if (typeof this.RateSignal$[symbol] === 'undefined') {
        this.createSignalForSymbol(symbol);
        continue;
      }
      const old = this.RateSignal$[symbol]();

      for (const [rateType, newRate] of JsonToIterable<number, RateTypeKeys>(
        incomingRate,
      )) {
        const oldRateObject = old[rateType];

        if (typeof oldRateObject === 'undefined' || oldRateObject.rate === 0) {
          this.RateSignal$[symbol].mutate((obj) => {
            obj[rateType] = {
              rate: newRate,
              color: HighLowColorType.Default,
              timeOutRef: null,
            };
          });
          continue;
        }

        if (oldRateObject.rate === newRate) {
          continue;
        }

        this.RateSignal$[symbol].mutate((obj) => {
          if (obj[rateType].rate < newRate) {
            obj[rateType].color = HighLowColorType.Green;
          } else if (obj[rateType].rate > newRate) {
            obj[rateType].color = HighLowColorType.Red;
          }
          if (obj[rateType].timeOutRef !== null) {
            clearTimeout(obj[rateType].timeOutRef);
            obj[rateType].timeOutRef = null;
          }
          oldRateObject.rate = newRate;
        });

        oldRateObject.timeOutRef = setTimeout(() => {
          this.RateSignal$[symbol].mutate((cro1) => {
            cro1[rateType].color = HighLowColorType.Default;
            cro1[rateType].timeOutRef = null;
          });
        }, 900);
      }

      const obj = this._LastRate.get(symbol);

      if (typeof obj !== 'undefined') {
        Object.assign(obj, incomingRate);
      }
    }
  }

  private CreateSignals() {
    for (const symbol of RateBaseSymbolsArray) {
      this.createSignalForSymbol(symbol);
    }
  }

  private createSignalForSymbol(symbol: RateBaseSymbols) {
    const a: RateSignalDataType = {} as never;
    RateTypeKeysArray.forEach((k) => {
      a[k] = {
        rate: 0,
        timeOutRef: null,
        color: HighLowColorType.Default,
      };
    });
    this.RateSignal$[symbol] = signal(a);
  }

  abstract getLastRates(): Promise<
    Record<RateBaseSymbols, BaseSymbolPriceInterface>
  >;

  abstract InitRemoteConnection(): void;
}
