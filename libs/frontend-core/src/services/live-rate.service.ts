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
import { RatesFixture } from '../fixtures';
import { faker } from '@faker-js/faker';

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
  LastRate: Record<RateBaseSymboles, BaseSymbolePriceInterface> = {} as never;
  protected RatesReadyBehaviourSubject = new BehaviorSubject(false);
  RatesReady$ = this.RatesReadyBehaviourSubject.asObservable();
  private _RatesReady = false;
  get RatesReady() {
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
    Rate: Partial<Record<RateBaseSymboles, Partial<BaseSymbolePriceInterface>>>
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
      await this.getLastRates().then((rate) => {
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

  abstract InitRemoteConnection(): void;
}

export class DemoLiveRateService extends LiveRateService {
  InitRemoteConnection(): void {
    this.Gold();
    this.Silver();
    this.SilverSpot();
    this.GoldSpot();
    this.INR();
  }
  private Silver() {
    const timeout = faker.datatype.number({
      max: 0.15,
      min: 0.05,
      precision: 0.01,
    });
    const SILVER = RatesFixture.Generate(
      {
        bottom: 65000,
        top: 68000,
      },
      {
        top: 15,
        bottom: 0,
      },
      this.LastRate[RateBaseSymboles.SILVER]
    );
    this.setRate({
      SILVER,
      SILVER_MCX: SILVER,
    });
    setTimeout(() => {
      this.Silver();
    }, timeout);
  }
  private Gold() {
    const timeout = faker.datatype.number({
      max: 0.15,
      min: 0.05,
      precision: 0.01,
    });
    const GOLD = RatesFixture.Generate(
      {
        bottom: 56000,
        top: 57000,
      },
      {
        top: 15,
        bottom: 0,
      },
      this.LastRate[RateBaseSymboles.GOLD]
    );
    this.setRate({
      GOLD,
      GOLD_MCX: GOLD,
    });
    setTimeout(() => {
      this.Gold();
    }, timeout);
  }
  private SilverSpot() {
    const timeout = faker.datatype.number({
      max: 0.15,
      min: 0.05,
      precision: 0.01,
    });
    const SILVER_SPOT = RatesFixture.Generate(
      {
        top: 25,
        bottom: 23,
        points: 0.01,
      },
      {
        top: 2,
        bottom: 0,
        points: 0.01,
      },
      this.LastRate[RateBaseSymboles.SILVER_SPOT]
    );
    this.setRate({
      SILVER_SPOT,
    });
    setTimeout(() => {
      this.SilverSpot();
    }, timeout);
  }

  private GoldSpot() {
    const timeout = faker.datatype.number({
      max: 0.15,
      min: 0.05,
      precision: 0.01,
    });
    const GOLD_SPOT = RatesFixture.Generate(
      {
        bottom: 1800,
        top: 1900,
        points: 0.01,
      },
      {
        top: 2,
        bottom: 1,
        points: 0.01,
      },
      this.LastRate[RateBaseSymboles.GOLD_SPOT]
    );
    this.setRate({
      GOLD_SPOT,
    });
    setTimeout(() => {
      this.GoldSpot();
    }, timeout);
  }

  private INR() {
    const timeout = faker.datatype.number({
      max: 0.15,
      min: 0.05,
      precision: 0.01,
    });
    const INR = RatesFixture.Generate(
      {
        top: 82,
        bottom: 81,
        points: 0.0001,
      },
      {
        top: 1,
        bottom: 0,
        points: 0.0001,
      },
      this.LastRate[RateBaseSymboles.INR]
    );
    this.setRate({
      INR,
    });
    setTimeout(() => {
      this.INR();
    }, timeout);
  }
  async getLastRates(): Promise<
    Record<RateBaseSymboles, BaseSymbolePriceInterface>
  > {
    return RatesFixture.GenerateForAllSymboles();
  }
}
