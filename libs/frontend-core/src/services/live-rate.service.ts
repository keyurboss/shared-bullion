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

import { BehaviorSubject } from 'rxjs';
import { JsonToIterable } from '../core';

export type RateObserDataType = Record<
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
  RateObser$: Record<RateBaseSymbols, WritableSignal<RateObserDataType>> =
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

  protected RatesReadyBehaviourSubject = new BehaviorSubject(false);
  RatesReady$ = this.RatesReadyBehaviourSubject.asObservable();
  private _RatesReady = false;
  get RatesReady() {
    return this._RatesReady;
  }

  protected set RatesReady(value) {
    // debugger;
    this._RatesReady = value;
    this.RatesReadyBehaviourSubject.next(value);
  }

  constructor(
    lastRate: SymbolWiseRate,
    envvariable: EnvInterface,
    initialiseService = true,
  ) {
    this.CreatSubjects();
    if (lastRate !== null && typeof lastRate !== 'undefined') {
      this.LastRate = new Map(JsonToIterable(lastRate));
      this.RatesReady = true;
    }
    if (
      envvariable !== null &&
      typeof lastRate !== 'undefined' &&
      envvariable.is_server
    ) {
      return;
    }
    if (initialiseService) {
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
    for (const [symb, currentRate] of Rate) {
      if (typeof this._LastRate.get(symb) === 'undefined') {
        this._LastRate.set(symb, currentRate as BaseSymbolPriceInterface);
        continue;
      }
      let old = this.RateObser$[symb]();
      if (old === null || typeof old === 'undefined') {
        old = {} as never;
      }
      for (const [rateType, newRate] of JsonToIterable<number, RateTypeKeys>(
        currentRate,
      )) {
        const oldRateObject = old[rateType];

        if (typeof oldRateObject === 'undefined' || oldRateObject.rate === 0) {
          old[rateType] = {
            rate: newRate,
            color: HighLowColorType.Default,
            timeOutRef: null,
          };
          continue;
        }
        if (oldRateObject.rate === newRate) {
          continue;
        }
        if (oldRateObject.rate < newRate) {
          oldRateObject.color = HighLowColorType.Green;
        } else if (oldRateObject.rate > newRate) {
          oldRateObject.color = HighLowColorType.Red;
        }
        if (oldRateObject.timeOutRef !== null) {
          clearTimeout(oldRateObject.timeOutRef);
          oldRateObject.timeOutRef = null;
        }

        oldRateObject.rate = newRate;

        oldRateObject.timeOutRef = setTimeout(() => {
          this.RateObser$[symb].mutate((cro1) => {
            cro1[rateType].color = HighLowColorType.Default;
            cro1[rateType].timeOutRef = null;
          });
        }, 900);
      }
      this.RateObser$[symb].set(old);
      const obj = this._LastRate.get(symb);
      if (typeof obj !== 'undefined') {
        Object.assign(obj, currentRate);
      }
    }
  }

  private CreatSubjects() {
    for (const symb of RateBaseSymbolsArray) {
      const a: RateObserDataType = {} as never;
      RateTypeKeysArray.forEach((k) => {
        a[k] = {
          rate: 0,
          timeOutRef: null,
          color: HighLowColorType.Default,
        };
      });
      this.RateObser$[symb] = signal(a);
    }
  }

  abstract getLastRates(): Promise<
    Record<RateBaseSymbols, BaseSymbolPriceInterface>
  >;

  abstract InitRemoteConnection(): void;
}
