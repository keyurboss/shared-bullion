import { toObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { randNumber } from '@ngneat/falso';
import { RandomNumberOptions } from '@ngneat/falso/lib/number';
import {
  BaseSymbolPriceInterface,
  HighLowColorType,
  RateBaseSymbols,
} from '@rps/bullion-interfaces';
import { firstValueFrom, skip, timeout } from 'rxjs';
import { JsonToIterable } from '../core';
import { RatesFixture } from '../fixtures';
import { DemoLiveRateService, InitialiseRemoteConnection } from '../mock';
import { InjectableRate, LiveRateService } from './live-rate.service';
import { Injector } from '@angular/core';
describe('ABS LiveRateService', () => {
  let service: LiveRateService;
  it('should be created with last Rate It is Injected and Rates Should be ready', () => {
    const rates = RatesFixture.GenerateForAllSymbols();
    service = new DemoLiveRateService(rates, null as never, false);
    expect(service.LastRate).toStrictEqual(new Map(JsonToIterable(rates)));
    expect(service.RatesReady).toStrictEqual(true);
    TestBed.runInInjectionContext(async () => {
      expect(
        firstValueFrom(
          toObservable(service.RatesReady$, {
            injector: TestBed.inject(Injector),
          }),
        ),
      ).resolves.toStrictEqual(true);
    });
  });
  describe('Value Change in Symbol', () => {
    beforeEach(async () => {
      const rates = RatesFixture.GenerateForAllSymbols();
      await TestBed.configureTestingModule({
        providers: [
          {
            provide: LiveRateService,
            useClass: DemoLiveRateService,
          },
          {
            provide: InitialiseRemoteConnection,
            useValue: false,
          },
        ],
      })
        .overrideProvider(InjectableRate, {
          useValue: rates,
        })
        .compileComponents();

      service = TestBed.inject(LiveRateService);
      // const fixture = TestBed.create;
      // component = fixture.componentInstance;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
      // fixture.detectChanges();
      // service = new DemoLiveRateService(rates, null as never, false);
    });
    it('New Value is Hight It Should Be Green', () => {
      TestBed.runInInjectionContext(async () => {
        const GOLD = service.LastRate.get(RateBaseSymbols.GOLD);
        const newValue =
          randNumber<RandomNumberOptions>({ length: 1 }) + (GOLD?.ask ?? 0);
        // toObservable(service.RateObser$.GOLD).subscribe(console.log);
        const next1 = firstValueFrom(
          toObservable(service.RateSignal$.GOLD, {
            injector: TestBed.inject(Injector),
          }).pipe(skip(1)),
        );
        const next2 = firstValueFrom(
          toObservable(service.RateSignal$.GOLD, {
            injector: TestBed.inject(Injector),
          }).pipe(skip(2)),
        );
        service.setRate(
          new Map([
            [
              RateBaseSymbols.GOLD,
              {
                ask: newValue,
              },
            ],
          ]),
        );

        await Promise.all([
          expect((await next1).ask).toStrictEqual(
            expect.objectContaining({
              rate: newValue,
              color: HighLowColorType.Green,
              timeOutRef: expect.any(Number),
            }),
          ),
          expect((await next2).ask).toStrictEqual(
            expect.objectContaining({
              rate: newValue,
              color: HighLowColorType.Default,
              timeOutRef: null,
            }),
          ),
        ]);
      });
    });
    it('New Value is Hight It Should Be Red', () => {
      TestBed.runInInjectionContext(async () => {
        const GOLD = service.LastRate.get(RateBaseSymbols.GOLD);
        const newValue =
          (GOLD?.ask ?? 0) - randNumber<RandomNumberOptions>({ length: 1 });
        // toObservable(service.RateObser$.GOLD).subscribe(console.log);
        const next1 = firstValueFrom(
          toObservable(service.RateSignal$.GOLD, {
            injector: TestBed.inject(Injector),
          }).pipe(skip(1)),
        );
        const next2 = firstValueFrom(
          toObservable(service.RateSignal$.GOLD, {
            injector: TestBed.inject(Injector),
          }).pipe(skip(2)),
        );
        service.setRate(
          new Map([
            [
              RateBaseSymbols.GOLD,
              {
                ask: newValue,
              },
            ],
          ]),
        );
        await Promise.all([
          expect((await next1).ask).toStrictEqual(
            expect.objectContaining({
              rate: newValue,
              color: HighLowColorType.Red,
              timeOutRef: expect.any(Number),
            }),
          ),
          expect((await next2).ask).toStrictEqual(
            expect.objectContaining({
              rate: newValue,
              color: HighLowColorType.Default,
              timeOutRef: null,
            }),
          ),
        ]);
      });
    });
  });
  describe('Auto Connect to Server and Get Last Rate', () => {
    let mockMethods: Record<
      keyof Pick<LiveRateService, 'getLastRates' | 'InitRemoteConnection'>,
      jest.Mock
    >;
    class MockLiveRateService extends LiveRateService {
      getLastRates(): Promise<
        Record<RateBaseSymbols, BaseSymbolPriceInterface>
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
          .mockResolvedValue(RatesFixture.GenerateForAllSymbols()),
        InitRemoteConnection: jest.fn(),
      };
    });
    it('Default Rate is Passed then getLastRates is not called and Rates are ready', () => {
      const rates = RatesFixture.GenerateForAllSymbols();
      const service = new MockLiveRateService(rates, null as never, false);
      expect(mockMethods.getLastRates).toBeCalledTimes(0);
      expect(service.RatesReady).toStrictEqual(true);
    });
    it('Default Rate is Not Passed then getLastRates is called and Rates are not ready', async () => {
      // const rates = RatesFixture.GenerateForAllSymboles();
      const service = new MockLiveRateService(
        null as never,
        null as never,
        true,
      );
      // service.RatesReady$.subscribe(console.log)
      expect(service.RatesReady).toStrictEqual(false);
      TestBed.runInInjectionContext(async () => {
        const injector = TestBed.inject(Injector);

        const initialValue = firstValueFrom(
          toObservable(service.RatesReady$, {
            injector,
          }),
        );
        const afterLastRate = firstValueFrom(
          toObservable(service.RatesReady$, { injector }).pipe(
            skip(1),
            timeout(2000),
          ),
        );
        expect(initialValue).resolves.toStrictEqual(false);
        expect(afterLastRate).resolves.toStrictEqual(true);
        await Promise.allSettled([initialValue, afterLastRate]);
        expect(mockMethods.getLastRates).toBeCalledTimes(1);
      });
    });
    test('InitRemoteConnection if true countructor', () => {
      const rates = RatesFixture.GenerateForAllSymbols();
      new MockLiveRateService(rates, null as never, true);
      expect(mockMethods.getLastRates).toBeCalledTimes(0);
      expect(mockMethods.InitRemoteConnection).toBeCalledTimes(1);
    });
  });
});
