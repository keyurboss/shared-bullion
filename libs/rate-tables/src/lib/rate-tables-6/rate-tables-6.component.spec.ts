import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { RateTables6Component } from './rate-tables-6.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@rps/buillion-frontend-core/mock';
import {
  BaseSymbolePriceInterface,
  RateBaseSymboles,
} from '@rps/bullion-interfaces';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';

describe('RateTablesComponent', () => {
  let component: RateTables6Component;
  let fixture: ComponentFixture<RateTables6Component>;
  let componentHtml: ShadowRoot;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables6Component],
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

    fixture = TestBed.createComponent(RateTables6Component);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 3 1st TestCase For Name', () => {
    test('check Header all Text && products length and Name', fakeAsync(() => {
      component.headers = {
        HeaderName: 'FUTURE RATE',
        bid: 'BID',
        diff: 'DIFF',
        ask: 'ASK',
      };
      component.table = [
        {
          ProductName: 'GOLD FUTURE',
          symbole: RateBaseSymboles.GOLD_MCX,
        },
        {
          ProductName: 'SILVER FUTURE',
          symbole: RateBaseSymboles.SILVER_MCX,
        },
      ];
      fixture.detectChanges();

      // check Header values
      const HeaderName = componentHtml
        .querySelector('.header_left_name')
        ?.textContent?.trim();
      const BIDName = componentHtml
        .querySelectorAll('.header_right_name')[0]
        ?.textContent?.trim();
      const DIFFName = componentHtml
        .querySelectorAll('.header_right_name')[1]
        ?.textContent?.trim();
      const ASKName = componentHtml
        .querySelectorAll('.header_right_name')[2]
        ?.textContent?.trim();
      expect(HeaderName).toStrictEqual(component.headers.HeaderName);
      expect(ASKName).toStrictEqual(component.headers.ask);
      expect(BIDName).toStrictEqual(component.headers.bid);
      expect(DIFFName).toStrictEqual(component.headers.diff);

      // Check Footerlength
      const footerlength =
        componentHtml.querySelectorAll('.footer_item')?.length;
      expect(footerlength).toStrictEqual(component.table.length);

      // Check Footer Details(Product Name)
      for (let i = 0; i < footerlength; i++) {
        const productname = componentHtml
          .querySelectorAll('.footer_name')
          [i]?.textContent?.trim();
        expect(productname).toStrictEqual(component.table[i]?.ProductName);
      }
    }));
    describe('Rate Table 3 2nd TestCase For classes', () => {
      let liveRateServiceRef!: LiveRateService;
      let rate: BaseSymbolePriceInterface;
      beforeEach(() => {
        liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
        component.headers = {
          HeaderName: faker.lorem.word(),
          bid: faker.lorem.word(),
          diff: faker.lorem.word(),
          ask: faker.lorem.word(),
        };
        component.table = [
          {
            symbole: RateBaseSymboles.GOLD,
            ProductName: faker.lorem.word(),
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
        liveRateServiceRef.setRate(new Map([[RateBaseSymboles.GOLD, rate]]));
        liveRateServiceRef.setRate(new Map([[RateBaseSymboles.GOLD, rate]]));
        fixture.detectChanges();
      });
      it('Rate Default No class', () => {
        const footerlength =
          componentHtml.querySelectorAll('.footer_item')?.length;
        for (let i = 0; i < footerlength; i++) {
          const rateNode =
            componentHtml.querySelectorAll('.footer_price_uper')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(
            false,
          );
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
        }
      });
      it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
        liveRateServiceRef.setRate(
          new Map([
            [
              RateBaseSymboles.GOLD,
              {
                ask: rate.ask + 10,
                bid: rate.bid + 10,
              },
            ],
          ]),
        );
        fixture.detectChanges();
        flush();
        const footerlength =
          componentHtml.querySelectorAll('.footer_item')?.length;
        for (let i = 0; i < footerlength; i++) {
          const rateNode =
            componentHtml.querySelectorAll('.footer_price_uper')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true);
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
        }
      }));
      it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
        liveRateServiceRef.setRate(
          new Map([
            [
              RateBaseSymboles.GOLD,
              {
                ask: rate.ask - 10,
                bid: rate.bid - 10,
              },
            ],
          ]),
        );
        fixture.detectChanges();
        flush();
        const footerlength =
          componentHtml.querySelectorAll('.footer_item')?.length;
        for (let i = 0; i < footerlength; i++) {
          const rateNode =
            componentHtml.querySelectorAll('.footer_price_uper')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(
            false,
          );
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
        }
      }));
    });
  });
});
