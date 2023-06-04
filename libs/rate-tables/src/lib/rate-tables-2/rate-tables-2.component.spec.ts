import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';
import { DemoLiveRateService, InitialiseRemoteConnection } from '@rps/buillion-frontend-core/mock';
import { BaseSymbolePriceInterface, RateBaseSymboles } from '@rps/bullion-interfaces';
import { RateTables2Component } from './rate-tables-2.component';

describe('RateTablesComponent', () => {
  let component: RateTables2Component;
  let fixture: ComponentFixture<RateTables2Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables2Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
        {
          provide: InitialiseRemoteConnection,
          useValue: false,
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables2Component);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 2 1st TestCase For Name', () => {
    test('check Header & all products Name', fakeAsync(() => {
      component.table = [
        {
          symbole: RateBaseSymboles.GOLD,
          productName: 'GOLD',
          BID: 'BID',
          ASK: 'ASK',
          HIGH: 'High',
          LOW: 'Low',
        },
      ];
      fixture.detectChanges();
      const headerName = componentHtml.querySelector('.header .gold')?.textContent;
      expect(headerName).toStrictEqual(component.table[0].productName);
      const productsname = componentHtml.querySelectorAll('.product_data_column');
      expect(productsname[0].querySelector('h3')?.textContent?.trim()).toStrictEqual(component.table[0].BID);
      expect(productsname[1].querySelector('h3')?.textContent?.trim()).toStrictEqual(component.table[0].ASK);
      expect(productsname[2].querySelector('h3')?.textContent?.trim()).toStrictEqual(component.table[0].HIGH);
      expect(productsname[3].querySelector('h3')?.textContent?.trim()).toStrictEqual(component.table[0].LOW);
    }))

    describe('Rate Table 2 2nd TestCase For classes', () => {
      let liveRateServiceRef !: LiveRateService
      let rate: BaseSymbolePriceInterface;
      beforeEach(() => {
        liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
        component.table = [
          {
            ASK: faker.lorem.word(),
            BID: faker.lorem.word(),
            HIGH: faker.lorem.word(),
            LOW: faker.lorem.word(),
            productName: faker.lorem.word(),
            symbole: RateBaseSymboles.GOLD,

          }
        ]
        rate = RatesFixture.Generate({
          top: 1500,
          bottom: 1000,
          // points: 0
        }, {
          bottom: 1,
          top: 15,
          // points: 0
        })
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, rate]
        ]))
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, rate]
        ]))
        fixture.detectChanges();
      })
      it('Rate Default No class', () => {
        const tableElements = componentHtml.querySelectorAll('.product_data_column');
        for (let i = 0; i < 4; i++) {
          const rateNode = tableElements[i].querySelector('p');
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
        }
      })
      it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask + 10,
            bid: rate.bid + 10,
            "last-high": rate['last-high'] + 10,
            "last-low": rate['last-low'] + 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        const tableElements = componentHtml.querySelectorAll('.product_data_column');
        for (let i = 0; i < 4; i++) {
          const rateNode = tableElements[i].querySelector('p');
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
        }
      }))
      it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask - 10,
            bid: rate.bid - 10,
            "last-high": rate['last-high'] - 10,
            "last-low": rate['last-low'] - 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        const tableElements = componentHtml.querySelectorAll('.product_data_column');
        for (let i = 0; i < 4; i++) {
          const rateNode = tableElements[i].querySelector('p');
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
        }
      }))
    })
  });
});