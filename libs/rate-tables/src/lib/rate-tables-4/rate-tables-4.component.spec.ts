import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { RateTables4Component } from './rate-tables-4.component';
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

describe('RateTablesComponent', () => {
  let component: RateTables4Component;
  let fixture: ComponentFixture<RateTables4Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables4Component],
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
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables4Component);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 4 1st TestCase', () => {
    test('check products length && Name', fakeAsync(() => {
      component.table = [
        {
          symbol: RateBaseSymbols.GOLD,
          productName: 'GOLD PRODUCTS',
        },
        {
          symbol: RateBaseSymbols.SILVER,
          productName: 'SILVER PRODUCTS',
        },
      ];
      fixture.detectChanges();
      const productlength = componentHtml.querySelectorAll('.product').length;
      expect(productlength).toStrictEqual(component.table.length);
      for (let i = 0; i < productlength; i++) {
        const productname = componentHtml
          .querySelectorAll('.product_name')
          [i]?.textContent?.trim();
        expect(productname).toStrictEqual(component.table[i]?.productName);
      }
    }));
  });
  describe('Rate Table 3 2nd TestCase For classes', () => {
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
          .querySelectorAll('.product_price')
          [i]?.querySelector('.hii');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
      }
      for (let i = 2; i < 4; i++) {
        const rateNode = componentHtml.querySelectorAll('.product_price')[i];
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
          .querySelectorAll('.product_price')
          [i]?.querySelector('div');
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
        const rateNode = componentHtml.querySelectorAll('.hii')[0];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
      }
    }));
  });
});
