import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { RateTables9Component } from './rate-tables-9.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@rps/buillion-frontend-core/mock';
import {
  BaseSymbolPriceInterface,
  RateBaseSymbols,
} from '@rps/bullion-interfaces';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';
import { ChangeDetectionStrategy } from '@angular/core';

describe('RateTablesComponent', () => {
  let component: RateTables9Component;
  let fixture: ComponentFixture<RateTables9Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables9Component],
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
      .overrideComponent(RateTables9Component, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RateTables9Component);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 9 1st TestCase', () => {
    test('check products Name', fakeAsync(() => {
      component.table = [
        {
          symbol: RateBaseSymbols.GOLD,
          productName: 'GOLD',
        },
      ];
      fixture.detectChanges();
      const headername = componentHtml
        .querySelector('.product h2')
        ?.textContent?.trim();
      expect(headername).toStrictEqual(component.table[0]?.productName);
    }));
  });
  describe('Rate Table 9 2nd TestCase For classes', () => {
    let liveRateServiceRef!: LiveRateService;
    let rate: BaseSymbolPriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.table = [
        {
          symbol: RateBaseSymbols.GOLD,
          productName: faker.lorem.word(),
        },
      ];
      rate = RatesFixture.Generate(
        {
          top: 1500,
          bottom: 1000,
          // points: 0
        },
        {
          bottom: 1,
          top: 15,
          // points: 0
        },
      );
      liveRateServiceRef.setRate(new Map([[RateBaseSymbols.GOLD, rate]]));
      liveRateServiceRef.setRate(new Map([[RateBaseSymbols.GOLD, rate]]));
      fixture.detectChanges();
    });
    it('Rate Default No class', () => {
      for (let i = 0; i < 2; i++) {
        const rateNode = componentHtml
          .querySelectorAll('.rate')
          [i]?.querySelector('h4');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
      }
    });
    it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymbols.GOLD,
            {
              ask: rate.ask + 10,
              bid: rate.bid + 10,
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      for (let i = 0; i < 2; i++) {
        const rateNode = componentHtml
          .querySelectorAll('.rate')
          [i]?.querySelector('h4');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
      }
    }));
    it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymbols.GOLD,
            {
              ask: rate.ask - 10,
              bid: rate.bid - 10,
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      for (let i = 0; i < 2; i++) {
        const rateNode = componentHtml
          .querySelectorAll('.rate')
          [i]?.querySelector('h4');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
      }
    }));
  });
});
