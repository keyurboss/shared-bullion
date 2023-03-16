import { InjectionToken } from '@angular/core';
import {
  BaseSymbolePriceInterface,
  EnvInterface,
  HighLowColorType,
  RateBaseSymboles,
  RateBaseSymbolesArray,
  RateTypeKeys,
  RateTypeKeysArray,
  SymboleWiseRate,
} from '@rps/bullion-interfaces';
import { BehaviorSubject } from 'rxjs';
import { JsonToItrable } from '../core';

export type RateObserDataType = Record<
  RateTypeKeys,
  {
    rate: number;
    color?: HighLowColorType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeOutRef: null | any;
  }
>;
export const InjectableRate = new InjectionToken<SymboleWiseRate>(
  'Insert Current Price'
);

export abstract class LiveRateService {
  RateObser$: Record<RateBaseSymboles, BehaviorSubject<RateObserDataType>> =
    {} as never;
  protected _LastRate: Map<RateBaseSymboles, BaseSymbolePriceInterface> =
    new Map();
  get LastRate(): Map<RateBaseSymboles, BaseSymbolePriceInterface> {
    return this._LastRate;
  }
  protected set LastRate(
    value: Map<RateBaseSymboles, BaseSymbolePriceInterface>
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
    this._RatesReady = value;
    this.RatesReadyBehaviourSubject.next(value);
  }

  constructor(
    lastRate: SymboleWiseRate,
    envvariable: EnvInterface,
    initialiseService = true
  ) {
    this.CreatSubjects();
    if (lastRate !== null && typeof lastRate !== 'undefined') {
      this.LastRate = new Map(JsonToItrable(lastRate));
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
        this.LastRate = new Map(JsonToItrable(rate));
        this.RatesReady = true;
      });
    }
    this.InitRemoteConnection();
  }

  setRate(Rate: Map<RateBaseSymboles, Partial<BaseSymbolePriceInterface>>) {
    for (const [symb, current_rate] of Rate) {
      if (typeof this._LastRate.get(symb) === 'undefined') {
        this._LastRate.set(symb, current_rate as BaseSymbolePriceInterface);
        continue;
      }
      let old = this.RateObser$[symb]?.value;
      if (old === null || typeof old === 'undefined') {
        old = {} as never;
      }
      for (const [rateType, new_rate] of JsonToItrable<number, RateTypeKeys>(
        current_rate
      )) {
        if (typeof old[rateType] === 'undefined' || old[rateType].rate === 0) {
          old[rateType] = {
            rate: new_rate,
            color: HighLowColorType.Default,
            timeOutRef: null,
          };
          continue;
        }
        const old_rate = old[rateType].rate;
        if (old_rate === new_rate) {
          continue;
        }
        if (old_rate < new_rate) {
          old[rateType].color = HighLowColorType.Green;
        } else if (old_rate > new_rate) {
          old[rateType].color = HighLowColorType.Red;
        }
        if (old[rateType].timeOutRef !== null) {
          clearTimeout(old[rateType].timeOutRef);
          old[rateType].timeOutRef = null;
        }
        old[rateType].rate = new_rate;
        old[rateType].timeOutRef = setTimeout(() => {
          const cro1 = this.RateObser$[symb]?.value;
          cro1[rateType].color = HighLowColorType.Default;
          cro1[rateType].timeOutRef = null;
          this.RateObser$[symb]?.next(cro1);
        }, 900);
      }
      this.RateObser$[symb]?.next(old);
      const obj = this._LastRate.get(symb);
      if (typeof obj !== 'undefined') {
        Object.assign(obj, current_rate);
      }
    }
  }

  private CreatSubjects() {
    for (const symb of RateBaseSymbolesArray) {
      const a: RateObserDataType = {} as never;
      RateTypeKeysArray.forEach((k) => {
        a[k] = {
          rate: 0,
          timeOutRef: null,
          color: HighLowColorType.Default,
        };
      });
      this.RateObser$[symb] = new BehaviorSubject(a);
    }
  }

  abstract getLastRates(): Promise<
    Record<RateBaseSymboles, BaseSymbolePriceInterface>
  >;

  abstract InitRemoteConnection(): void;
}
