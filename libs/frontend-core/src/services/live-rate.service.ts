import { Inject, InjectionToken, Optional } from '@angular/core';
import {
  BaseSymbolePriceInterface,
  EnvInterface,
  HighLowColorType,
  RateBaseSymboles,
  SymboleWiseRate,
} from '@rps/bullion-interfaces';
import { BehaviorSubject } from 'rxjs';
import { Env, JsonToItrable } from '../core';
import { RateTypeKeys } from '@rps/bullion-interfaces';

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
  RateObser$!: Record<RateBaseSymboles, BehaviorSubject<RateObserDataType>>;
  protected LastRate: Record<RateBaseSymboles, BaseSymbolePriceInterface> =
    {} as never;
  protected RatesReadyBehaviourSubject = new BehaviorSubject(false);
  RatesReady$ = this.RatesReadyBehaviourSubject.asObservable();
  private _RatesReady = false;
  protected get RatesReady() {
    return this._RatesReady;
  }
  protected set RatesReady(value) {
    this._RatesReady = value;
    if (value) {
      this.CretaeSubjects();
    }
    this.RatesReadyBehaviourSubject.next(value);
  }

  constructor(
    @Optional() @Inject(InjectableRate) lastRate: SymboleWiseRate,
    @Optional() @Inject(Env) envvariable: EnvInterface
  ) {
    if (lastRate !== null) {
      this.LastRate = lastRate;
      this.RatesReady = true;
    }
    if (envvariable !== null && envvariable.is_server) {
      return;
    }
    this.init();
  }
  setRate(
    Rate: Record<Partial<RateBaseSymboles>, Partial<BaseSymbolePriceInterface>>
  ) {
    for (const [symb, current_rate] of JsonToItrable<
      BaseSymbolePriceInterface,
      RateBaseSymboles
    >(Rate)) {
      if (typeof this.LastRate[symb] === 'undefined') {
        this.LastRate[symb] = current_rate;
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
        } else if (this.LastRate[symb][rateType] > current_rate[rateType]) {
          cro[rateType].color = HighLowColorType.Red;
        }
        if (cro[rateType].timeOutRef !== null) {
          clearTimeout(cro[rateType].timeOutRef);
          cro[rateType].timeOutRef = null;
        }
        cro[rateType].timeOutRef = setTimeout(() => {
          const cro1 = this.RateObser$[symb]?.value;
          cro1[rateType].color = HighLowColorType.Default;
          this.RateObser$[symb]?.next(cro1);
        }, 900);
      }
      this.RateObser$[symb]?.next(cro);
      Object.assign(this.LastRate[symb], current_rate);
    }
  }
  private async init() {
    if (this.RatesReady === false) {
      this.getLastRates().then((rate) => {
        this.LastRate = rate;
        this.RatesReady = true;
      });
    }
  }

  private CretaeSubjects() {
    for (const [symb, current_rate] of JsonToItrable<
      BaseSymbolePriceInterface,
      RateBaseSymboles
    >(this.LastRate)) {
      const a: RateObserDataType = {} as never;
      JsonToItrable<number, RateTypeKeys>(current_rate).forEach(([k, v]) => {
        a[k] = {
          rate: v,
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
}
