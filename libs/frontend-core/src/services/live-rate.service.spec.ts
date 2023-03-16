import { LiveRateService } from './live-rate.service';
// import faker from '@faker-js/faker';
import { RatesFixture } from '../fixtures';
import { firstValueFrom, skip } from 'rxjs';
import { DemoLiveRateService } from '../mock';
import { JsonToItrable } from '../core';
import { RateBaseSymboles } from '../../../core/interfaces/src';
import {
  BaseSymbolePriceInterface,
  HighLowColorType,
} from '@rps/bullion-interfaces';
import { faker } from '@faker-js/faker';

describe('ABS LiveRateService', () => {
  let service: LiveRateService;
  it('should be created with last Rate It is Injected and Rates Should be ready', () => {
    const rates = RatesFixture.GenerateForAllSymboles();
    service = new DemoLiveRateService(rates, null as never, false);
    expect(service.LastRate).toStrictEqual(new Map(JsonToItrable(rates)));
    expect(service.RatesReady).toStrictEqual(true);
    expect(firstValueFrom(service.RatesReady$)).resolves.toStrictEqual(true);
  });
  describe('Value Change in Symbole', () => {
    beforeEach(() => {
      const rates = RatesFixture.GenerateForAllSymboles();
      service = new DemoLiveRateService(rates, null as never, false);
    });
    test('New Value is Hight It Should Be Green', async () => {
      const GOLD = service.LastRate.get(RateBaseSymboles.GOLD);
      const newValue = +faker.random.numeric(1) + (GOLD?.ask ?? 0);
      // service.RateObser$.GOLD.subscribe(console.log);
      const next1 = firstValueFrom(service.RateObser$.GOLD.pipe(skip(1)));
      const next2 = firstValueFrom(service.RateObser$.GOLD.pipe(skip(2)));
      service.setRate(
        new Map([
          [
            RateBaseSymboles.GOLD,
            {
              ask: newValue,
            },
          ],
        ])
      );
      expect(await next1).toStrictEqual(
        expect.objectContaining({
          ask: expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Green,
            timeOutRef: expect.anything(),
          }),
        })
      );
      expect(await next2).toStrictEqual(
        expect.objectContaining({
          ask: expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Default,
            timeOutRef: null,
          }),
        })
      );
    });
    test('New Value is Hight It Should Be Red', async () => {
      const GOLD = service.LastRate.get(RateBaseSymboles.GOLD);
      const newValue = (GOLD?.ask ?? 0) - +faker.random.numeric(1);
      // service.RateObser$.GOLD.subscribe(console.log);
      const next1 = firstValueFrom(service.RateObser$.GOLD.pipe(skip(1)));
      const next2 = firstValueFrom(service.RateObser$.GOLD.pipe(skip(2)));
      service.setRate(
        new Map([
          [
            RateBaseSymboles.GOLD,
            {
              ask: newValue,
            },
          ],
        ])
      );
      expect(await next1).toStrictEqual(
        expect.objectContaining({
          ask: expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Red,
            timeOutRef: expect.anything(),
          }),
        })
      );
      expect(await next2).toStrictEqual(
        expect.objectContaining({
          ask: expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Default,
            timeOutRef: null,
          }),
        })
      );
    });
  });
  test.skip('Auto Connect to Server', () => {
    // class MockLiveRateService extends LiveRateService {
    //   public getLastRates = jest.fn().mockImplementation(async () => {
    //     return RatesFixture.GenerateForAllSymboles();
    //   }).bind(this);
    //   public InitRemoteConnection = jest.fn().bind(this);
    // }
    const rates = RatesFixture.GenerateForAllSymboles();
    service = new DemoLiveRateService(rates, null as never, true);
    expect(service.getLastRates).toBeCalledTimes(1);
    expect(service.InitRemoteConnection).toBeCalledTimes(1);
  });
});
