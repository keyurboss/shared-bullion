import { Inject, Injectable, Optional } from '@angular/core';
import {
  BaseSymbolePriceInterface,
  EnvInterface,
  RateBaseSymboles,
  SymboleWiseRate,
} from '@rps/bullion-interfaces';
import { Env, JsonToItrable } from '../core';
import { RatesFixture } from '../fixtures';
import { InjectableRate, LiveRateService } from '../services/live-rate.service';
import { randNumber } from '@ngneat/falso';

export const InitialiseRemoteConnection = 'initialiseRemoteConnection';

@Injectable({
  providedIn: 'root',
})
export class DemoLiveRateService extends LiveRateService {
  constructor(
    @Optional() @Inject(InjectableRate) lastRate: SymboleWiseRate,
    @Optional() @Inject(Env) envvariable: EnvInterface,
    @Optional()
    @Inject(InitialiseRemoteConnection)
    initialiseRemoteConnection: boolean
  ) {
    super(lastRate, envvariable, initialiseRemoteConnection ?? true);
  }
  InitRemoteConnection(): void {
    this.Gold();
    this.Silver();
    this.SilverSpot();
    this.GoldSpot();
    this.INR();
  }
  private Silver() {
    const timeout = randNumber({
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
      this._LastRate.get(RateBaseSymboles.SILVER)
    );
    this.setRate(
      new Map(
        JsonToItrable({
          SILVER,
          SILVER_MCX: SILVER,
        })
      )
    );
    setTimeout(() => {
      this.Silver();
    }, timeout * 10000);
  }
  private Gold() {
    const timeout = randNumber({
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
      this._LastRate.get(RateBaseSymboles.GOLD)
    );
    this.setRate(
      new Map(
        JsonToItrable({
          GOLD,
          GOLD_MCX: GOLD,
        })
      )
    );
    setTimeout(() => {
      this.Gold();
    }, timeout * 10000);
  }
  private SilverSpot() {
    const timeout = randNumber({
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
      this._LastRate.get(RateBaseSymboles.SILVER_SPOT)
    );
    this.setRate(
      new Map(
        JsonToItrable({
          SILVER_SPOT,
        })
      )
    );
    setTimeout(() => {
      this.SilverSpot();
    }, timeout * 10000);
  }

  private GoldSpot() {
    const timeout = randNumber({
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
      this._LastRate.get(RateBaseSymboles.GOLD_SPOT)
    );
    this.setRate(
      new Map(
        JsonToItrable({
          GOLD_SPOT,
        })
      )
    );
    setTimeout(() => {
      this.GoldSpot();
    }, timeout * 10000);
  }

  private INR() {
    const timeout = randNumber({
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
      this._LastRate.get(RateBaseSymboles.INR)
    );
    this.setRate(
      new Map(
        JsonToItrable({
          INR,
        })
      )
    );
    setTimeout(() => {
      this.INR();
    }, timeout * 10000);
  }
  async getLastRates(): Promise<
    Record<RateBaseSymboles, BaseSymbolePriceInterface>
  > {
    return RatesFixture.GenerateForAllSymboles();
  }
}
