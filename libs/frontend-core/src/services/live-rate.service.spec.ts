import { LiveRateService } from './live-rate.service';
// import faker from '@faker-js/faker';
import { RatesFixture } from '../fixtures';
import { firstValueFrom, skip, timeout } from 'rxjs';
import { DemoLiveRateService } from '../mock';
import { JsonToItrable } from '../core';
import { RateBaseSymboles } from '@rps/bullion-interfaces/core';
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
        false
      );
      expect(service.RatesReady).toStrictEqual(false);
      const initialValue = await firstValueFrom(service.RatesReady$.pipe());
      const afterLastRate = await firstValueFrom(
        service.RatesReady$.pipe(skip(1), timeout(2000))
      );
      expect(initialValue).toStrictEqual(false);
      expect(afterLastRate).toStrictEqual(false);
    });
    test('InitRemoteConnection if true countructor',()=>{
      const rates = RatesFixture.GenerateForAllSymboles();
      new MockLiveRateService(rates, null as never, true);
      expect(mockMethods.getLastRates).toBeCalledTimes(0);
      expect(mockMethods.InitRemoteConnection).toBeCalledTimes(1);
    });
  });
});
