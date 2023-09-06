import { Inject, Injectable, Optional } from '@angular/core';
import {
  BaseSymbolPriceInterface,
  EnvInterface,
  RateBaseSymbols,
  SymbolWiseRate,
} from '@rps/bullion-interfaces';
import { Env, JsonToIterable } from '@bf/core';
import { RatesFixture } from '../fixtures';
import { InjectableRate, LiveRateService } from '../services/live-rate.service';
import { randNumber } from '@ngneat/falso';

export const InitialiseRemoteConnection = 'initialiseRemoteConnection';
@Injectable({
  providedIn: 'root',
})
export class DemoLiveRateService extends LiveRateService {
  get timeout() {
    return (
      randNumber({
        max: 1,
        min: 0.2,
        precision: 0.01,
      }) * 1000
    );
  }

  constructor(
    @Optional() @Inject(InjectableRate) lastRate: SymbolWiseRate,
    @Optional() @Inject(Env) envvariable: EnvInterface,
    @Optional()
    @Inject(InitialiseRemoteConnection)
    initialiseRemoteConnection: boolean,
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
    const SILVER = RatesFixture.Generate(
      {
        bottom: 65000,
        top: 68000,
      },
      {
        top: 15,
        bottom: 0,
      },
      this._LastRate.get(RateBaseSymbols.SILVER),
    );
    this.setRate(
      new Map(
        JsonToIterable({
          SILVER,
          SILVER_MCX: SILVER,
        }),
      ),
    );
    setTimeout(() => {
      this.Silver();
    }, this.timeout);
  }

  private Gold() {
    const GOLD = RatesFixture.Generate(
      {
        bottom: 56000,
        top: 57000,
      },
      {
        top: 15,
        bottom: 0,
      },
      this._LastRate.get(RateBaseSymbols.GOLD),
    );
    this.setRate(
      new Map(
        JsonToIterable({
          GOLD,
          GOLD_MCX: GOLD,
        }),
      ),
    );
    setTimeout(() => {
      this.Gold();
    }, this.timeout);
  }

  private SilverSpot() {
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
      this._LastRate.get(RateBaseSymbols.SILVER_SPOT),
    );
    this.setRate(
      new Map(
        JsonToIterable({
          SILVER_SPOT,
        }),
      ),
    );
    setTimeout(() => {
      this.SilverSpot();
    }, this.timeout);
  }

  private GoldSpot() {
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
      this._LastRate.get(RateBaseSymbols.GOLD_SPOT),
    );
    this.setRate(
      new Map(
        JsonToIterable({
          GOLD_SPOT,
        }),
      ),
    );
    setTimeout(() => {
      this.GoldSpot();
    }, this.timeout);
  }

  private INR() {
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
      this._LastRate.get(RateBaseSymbols.INR),
    );
    this.setRate(
      new Map(
        JsonToIterable({
          INR,
        }),
      ),
    );
    setTimeout(() => {
      this.INR();
    }, this.timeout);
  }

  async getLastRates(): Promise<
    Record<RateBaseSymbols, BaseSymbolPriceInterface>
  > {
    return RatesFixture.GenerateForAllSymbols();
  }
}
