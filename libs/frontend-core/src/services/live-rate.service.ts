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

type RateObserDataType = Record<
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
  protected _LastRate: Record<RateBaseSymboles, BaseSymbolePriceInterface> =
    {} as never;
  get LastRate(): Record<RateBaseSymboles, BaseSymbolePriceInterface> {
    return this._LastRate;
  }
  protected set LastRate(
    value: Record<RateBaseSymboles, BaseSymbolePriceInterface>
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
    protected initialiseRemoteConnection = true
  ) {
    if (lastRate !== null && typeof lastRate !== 'undefined') {
      this.LastRate = lastRate;
      this.RatesReady = true;
    }
    if (
      envvariable !== null &&
      typeof lastRate !== 'undefined' &&
      envvariable.is_server
    ) {
      return;
    }
    this.init();
  }
  setRate(
    Rate: Partial<Record<RateBaseSymboles, Partial<BaseSymbolePriceInterface>>>
  ) {
    for (const [symb, current_rate] of JsonToItrable<
      BaseSymbolePriceInterface,
      RateBaseSymboles
    >(Rate)) {
      if (typeof this._LastRate[symb] === 'undefined') {
        this._LastRate[symb] = current_rate;
        continue;
      }
      let cro = this.RateObser$[symb]?.value;

      if (cro === null || typeof cro === 'undefined') {
        cro = {} as never;
      }
      for (const [rateType, new_rate] of JsonToItrable<number, RateTypeKeys>(
        current_rate
      )) {
        if (typeof cro[rateType] === 'undefined') {
          cro[rateType] = {
            rate: new_rate,
            color: HighLowColorType.Default,
            timeOutRef: null,
          };
          continue;
        }
        if (cro[rateType].rate === current_rate[rateType]) {
          continue;
        }
        if (cro[rateType].rate < current_rate[rateType]) {
          cro[rateType].color = HighLowColorType.Green;
        } else if (this._LastRate[symb][rateType] > current_rate[rateType]) {
          cro[rateType].color = HighLowColorType.Red;
        }
        if (cro[rateType].timeOutRef !== null) {
          clearTimeout(cro[rateType].timeOutRef);
          cro[rateType].timeOutRef = null;
        }
        cro[rateType].rate = current_rate[rateType];
        cro[rateType].timeOutRef = setTimeout(() => {
          const cro1 = this.RateObser$[symb]?.value;
          cro1[rateType].color = HighLowColorType.Default;
          this.RateObser$[symb]?.next(cro1);
        }, 900);
      }
      this.RateObser$[symb]?.next(cro);
      Object.assign(this._LastRate[symb], current_rate);
    }
  }
  private async init() {
    this.CreatSubjects();
    if (this.RatesReady === false) {
      await this.getLastRates().then((rate) => {
        this.LastRate = rate;
        this.RatesReady = true;
      });
    }
    if(this.initialiseRemoteConnection){
      this.InitRemoteConnection();
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
