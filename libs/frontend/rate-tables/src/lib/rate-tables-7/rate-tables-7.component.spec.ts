/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';

import { LiveRateService } from '@bf/services';
import { DemoLiveRateService } from '@bf/services/mock';
import {
  BaseSymbolPriceInterface,
  RateBaseSymbols,
} from '@rps/bullion-interfaces';
import { RateTables7Component } from './rate-tables-7.component';
import { faker } from '@faker-js/faker';
import { RatesFixture } from '@bf/services/fixtures';
import { ChangeDetectionStrategy } from '@angular/core';
export const InitialiseRemoteConnection = 'initialiseRemoteConnection';

describe('RateTablesComponent', () => {
  let component: RateTables7Component;
  let fixture: ComponentFixture<RateTables7Component>;
  let comp: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables7Component],
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
      .overrideComponent(RateTables7Component, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RateTables7Component);
    component = fixture.componentInstance;

    component.Table_title = {
      buy: 'BUY',
      gold: 'GOLD BAR',
      Header: 'Products',
      sell: 'SELL',
    };
    component.table = [
      {
        symbol: RateBaseSymbols.SILVER,
        productname: [
          {
            name: 'SILVER. BARTCS',
          },
          {
            name: 'Silver Peti RJT TCS',
          },
          {
            name: 'Silver Bar RR TCS',
          },
        ],
      },
    ];
    comp = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 7 1st TestCase For Name', () => {
    test('check Header & all products Name', () => {
      fixture.detectChanges();
      const headername = comp.querySelector('.product_group_header_1');
      expect(headername?.innerHTML).toStrictEqual(component.Table_title.Header);
      const Sellname = comp
        .querySelector('.product_group_left_header_1')
        ?.textContent?.trim();
      expect(Sellname).toStrictEqual(component.Table_title.sell);

      const tableobj = comp.querySelectorAll('.Table');
      for (let i = 0; i < tableobj.length; i++) {
        const PrObject = component.table[i]?.productname || [];
        for (let j = 0; j < PrObject.length; j++) {
          const productsname = comp.querySelectorAll('.productname');
          expect(productsname[j]?.textContent?.trim()).toStrictEqual(
            PrObject[j]?.name,
          );
        }
      }
    });
  });

  describe('Rate Table 7 2nd TestCase For classes', () => {
    let liveRateServiceRef!: LiveRateService;
    let rate: BaseSymbolPriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.table = [
        {
          symbol: RateBaseSymbols.SILVER,
          productname: [{ name: faker.lorem.word() }],
        },
      ];

      rate = RatesFixture.Generate(
        {
          top: 1500,
          bottom: 1000,
        },
        {
          bottom: 1,
          top: 15,
        },
      );
      liveRateServiceRef.setRate(new Map([[RateBaseSymbols.SILVER, rate]]));
      liveRateServiceRef.setRate(new Map([[RateBaseSymbols.SILVER, rate]]));
      fixture.detectChanges();
    });
    it('Rate Default No class', () => {
      const length = comp.querySelectorAll('.rate').length;
      for (let i = 0; i < length; i++) {
        const rateNode = comp.querySelectorAll('.rate')[i];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
      }
    });
    it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymbols.SILVER,
            {
              ask: rate.ask + 10,
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      const length = comp.querySelectorAll('.price_buy').length;
      for (let i = 0; i < length; i++) {
        const rateNode = comp.querySelectorAll('.price_buy')[i];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
      }
    }));
    it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
      liveRateServiceRef.setRate(
        new Map([
          [
            RateBaseSymbols.SILVER,
            {
              ask: rate.ask - 10,
            },
          ],
        ]),
      );
      fixture.detectChanges();
      flush();
      const length = comp.querySelectorAll('.price_buy').length;
      for (let i = 0; i < length; i++) {
        const rateNode = comp.querySelectorAll('.price_buy')[i];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
      }
    }));
  });
});
