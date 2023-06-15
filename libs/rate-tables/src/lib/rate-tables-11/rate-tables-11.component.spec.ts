import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';

import { RateTables11Component } from './rate-tables-11.component';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@rps/buillion-frontend-core/mock';
import {
  BaseSymbolePriceInterface,
  RateBaseSymboles,
} from '@rps/bullion-interfaces';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';
import { faker } from '@faker-js/faker';

describe('RateTablesComponent', () => {
  let component: RateTables11Component;
  let fixture: ComponentFixture<RateTables11Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables11Component],
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

    fixture = TestBed.createComponent(RateTables11Component);
    component = fixture.componentInstance;

    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;

    component.Header = 'GOLD PRODUCTS';
    component.sell = 'Sell';

    component.table = [
      {
        symbole: RateBaseSymboles.GOLD,
        ProductName: [
          {
            name: 'GOLD 999 IMP WITH TDS',
          },
          {
            name: 'GOLD 999 IMP WITH TCS',
          },
        ],
      },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rate Table 11 1st TestCase', () => {
    test('check table length & products Name', () => {
      fixture.detectChanges();
      const headername = componentHtml
        .querySelector('.product_group_header')
        ?.textContent?.trim();
      expect(headername).toStrictEqual(component.Header);
      const Shellname = componentHtml
        .querySelector('.sell')
        ?.textContent?.trim();
      expect(Shellname).toStrictEqual(component.sell);
      const productslength =
        componentHtml.querySelectorAll('.product_name').length;
      for (let i = 0; i < productslength; i++) {
        const productsname = componentHtml
          .querySelectorAll('.product_name')
          [i]?.textContent?.trim();
        expect(productsname).toStrictEqual(
          component.table[0]?.ProductName[i]?.name.trim()
        );
      }
    });
  });

  describe('Rate Table 11 2nd TestCase For classes', () => {
    let liveRateServiceRef!: LiveRateService;
    let rate: BaseSymbolePriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.Header = faker.lorem.word();
      component.sell = faker.lorem.word();
      component.table = [
        {
          symbole: RateBaseSymboles.GOLD,
          ProductName: [{ name: faker.lorem.word() }],
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
        }
      );
      liveRateServiceRef.setRate(new Map([[RateBaseSymboles.GOLD, rate]]));
      liveRateServiceRef.setRate(new Map([[RateBaseSymboles.GOLD, rate]]));
      fixture.detectChanges();
    });
    it('Rate Default No class', () => {
      const rateNode = componentHtml.querySelectorAll('.rate_div')[0];
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
    });
    it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymboles.GOLD,
            {
              ask: rate.ask + 10,
            },
          ],
        ])
      );
      fixture.detectChanges();
      flush();
      const rateNode = componentHtml
        .querySelectorAll('.product_price')[0]
        ?.querySelector('.rate_div');
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true);
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
    }));
    it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymboles.GOLD,
            {
              ask: rate.ask - 10,
            },
          ],
        ])
      );
      fixture.detectChanges();
      flush();
      const rateNode = componentHtml
        .querySelectorAll('.product_price')[0]
        ?.querySelector('.rate_div');
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
    }));
  });
});
