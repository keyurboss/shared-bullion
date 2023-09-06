import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { LiveRateService } from '@bf/services';
import { RatesFixture } from '@bf/services/fixtures';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@bf/services/mock';
import {
  BaseSymbolPriceInterface,
  RateBaseSymbols,
} from '@rps/bullion-interfaces';
import { RateTables1Component } from './rate-tables-1.component';
import { ChangeDetectionStrategy } from '@angular/core';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables1Component],
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
      .overrideComponent(RateTables1Component, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RateTables1Component);
    // fixture.autoDetectChanges(true)
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rate Table 1 1st TestCase For Name', () => {
    test('check Header & all products Name', fakeAsync(() => {
      component.header = 'GOLD';
      component.sell = 'SELL';
      component.table = [
        {
          symbol: RateBaseSymbols.GOLD,
          productName: [
            {
              name: 'GOLD 999 IMP WITH TDS',
            },
            {
              name: 'GOLD 999 IMP WITH TCS',
            },
            {
              name: 'GOLD 999 LOCAL WITH TDS',
            },
            {
              name: 'GOLD 999 LOCAL WITH TCS',
            },
          ],
        },
      ];

      fixture.detectChanges();
      fixture.changeDetectorRef.detectChanges();
      tick();
      const headername = componentHtml
        .querySelector('.parent h3')
        ?.textContent?.trim();
      const Sellname = componentHtml
        .querySelector('.parent p')
        ?.textContent?.trim();

      expect(headername).toStrictEqual(component.header);
      expect(Sellname).toStrictEqual(component.sell);

      const lengthR = componentHtml.querySelectorAll('.child_left').length;
      for (let i = 0; i < lengthR; i++) {
        const productsname = componentHtml
          .querySelectorAll('.child_left')
          [i]?.textContent?.trim();

        fixture.detectChanges();
        tick();

        expect(productsname).toStrictEqual(
          component.table[0]?.productName[i]?.name.trim(),
        );
      }
    }));
  });

  describe('Rate Table 1 2nd TestCase For classes', () => {
    let liveRateServiceRef!: LiveRateService;
    let rate: BaseSymbolPriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.table = [
        {
          symbol: RateBaseSymbols.GOLD,
          productName: [{ name: faker.lorem.word() }],
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
      const length = componentHtml.querySelectorAll('.child_right').length;
      for (let i = 0; i < length; i++) {
        const rateNode = componentHtml.querySelectorAll('.child_right')[i];
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
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      const length = componentHtml.querySelectorAll('.child_left').length;
      for (let i = 0; i < length; i++) {
        const rateNode = componentHtml.querySelectorAll('.child_right')[0];
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
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      const length = componentHtml.querySelectorAll('.child_left').length;
      for (let i = 0; i < length; i++) {
        const rateNode = componentHtml.querySelectorAll('.child_right')[0];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
      }
    }));
  });
});
