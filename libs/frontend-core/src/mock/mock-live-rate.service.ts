import { Inject, Injectable, Optional } from '@angular/core';
import {
  BaseSymbolePriceInterface,
  EnvInterface,
  RateBaseSymboles,
  SymboleWiseRate,
} from '@rps/bullion-interfaces';
import { Env } from '../core';
import { RatesFixture } from '../fixtures';
import { InjectableRate, LiveRateService } from '../services/live-rate.service';

@Injectable({
  providedIn: 'root',
})
export class MockLiveRateService extends LiveRateService {
  constructor(
    @Optional() @Inject(InjectableRate) lastRate: SymboleWiseRate,
    @Optional() @Inject(Env) envvariable: EnvInterface,
  ) {
    super(lastRate, envvariable, false);
  }
  InitRemoteConnection(): void {
    // throw new Error('Method not implemented.');
  }
  async getLastRates(): Promise<
  Record<RateBaseSymboles, BaseSymbolePriceInterface>
  > {
    return RatesFixture.GenerateForAllSymboles();
  }
}
