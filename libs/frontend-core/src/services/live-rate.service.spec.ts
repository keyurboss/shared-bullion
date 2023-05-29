import { LiveRateService } from './live-rate.service';
import { RatesFixture } from '../fixtures';
import { firstValueFrom, skip, timeout } from 'rxjs';
import { DemoLiveRateService } from '../mock';
import { JsonToItrable } from '../core';
import {
  RateBaseSymboles,
  BaseSymbolePriceInterface,
  HighLowColorType,
} from '@rps/bullion-interfaces';
import { randNumber } from '@ngneat/falso';
import { RandomNumberOptions } from '@ngneat/falso/lib/number';

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
    it('New Value is Hight It Should Be Green', async () => {
      const GOLD = service.LastRate.get(RateBaseSymboles.GOLD);
      const newValue =
        randNumber<RandomNumberOptions>({ length: 1 }) + (GOLD?.ask ?? 0);
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

      await Promise.all([
        expect((await next1).ask).toStrictEqual(
          expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Green,
            timeOutRef: expect.any(Number),
          })
        ),
        expect((await next2).ask).toStrictEqual(
          expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Default,
            timeOutRef: null,
          })
        ),
      ]);
    });
    it('New Value is Hight It Should Be Red', async () => {
      const GOLD = service.LastRate.get(RateBaseSymboles.GOLD);
      const newValue =
        (GOLD?.ask ?? 0) - randNumber<RandomNumberOptions>({ length: 1 });
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
      await Promise.all([
        expect((await next1).ask).toStrictEqual(
          expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Red,
            timeOutRef: expect.any(Number),
          })
        ),
        expect((await next2).ask).toStrictEqual(
          expect.objectContaining({
            rate: newValue,
            color: HighLowColorType.Default,
            timeOutRef: null,
          })
        ),
      ]);
    });
  });
  describe('Auto Connect to Server and Get Last Rate', () => {
    let mockMethods: Record<
      keyof Pick<LiveRateService, 'getLastRates' | 'InitRemoteConnection'>,
      jest.Mock
    >;
    class MockLiveRateService extends LiveRateService {
      getLastRates(): Promise<
        Record<RateBaseSymboles, BaseSymbolePriceInterface>
      > {
        return mockMethods.getLastRates();
      }
      
      InitRemoteConnection(): void {
        return mockMethods.InitRemoteConnection();
      }
    }
    beforeEach(() => {
      mockMethods = {
        getLastRates: jest
          .fn()
          .mockResolvedValue(RatesFixture.GenerateForAllSymboles()),
        InitRemoteConnection: jest.fn(),
      };
    });
    it('Default Rate is Passed then getLastRates is not called and Rates are ready', () => {
      const rates = RatesFixture.GenerateForAllSymboles();
      const service = new MockLiveRateService(rates, null as never, false);
      expect(mockMethods.getLastRates).toBeCalledTimes(0);
      expect(service.RatesReady).toStrictEqual(true);
    });
    it('Default Rate is Not Passed then getLastRates is called and Rates are not ready', async () => {
      // const rates = RatesFixture.GenerateForAllSymboles();
      const service = new MockLiveRateService(
        null as never,
        null as never,
        true
      );
      // service.RatesReady$.subscribe(console.log)
      expect(service.RatesReady).toStrictEqual(false);
      const initialValue = firstValueFrom(service.RatesReady$);
      const afterLastRate = firstValueFrom(
        service.RatesReady$.pipe(skip(1), timeout(2000))
      );
      expect(initialValue).resolves.toStrictEqual(false);
      expect(afterLastRate).resolves.toStrictEqual(true);
      await Promise.allSettled([initialValue, afterLastRate]);
      expect(mockMethods.getLastRates).toBeCalledTimes(1);
    });
    test('InitRemoteConnection if true countructor', () => {
      const rates = RatesFixture.GenerateForAllSymboles();
      new MockLiveRateService(rates, null as never, true);
      expect(mockMethods.getLastRates).toBeCalledTimes(0);
      expect(mockMethods.InitRemoteConnection).toBeCalledTimes(1);
    });
  });
});
