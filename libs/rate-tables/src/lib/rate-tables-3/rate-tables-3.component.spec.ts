import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { RateTables3Component } from './rate-tables-3.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService, InitialiseRemoteConnection } from '@rps/buillion-frontend-core/mock';
import { BaseSymbolePriceInterface, RateBaseSymboles } from '@rps/bullion-interfaces';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';

describe('RateTablesComponent', () => {
  let component: RateTables3Component;
  let fixture: ComponentFixture<RateTables3Component>;
  let componentHtml: ShadowRoot;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables3Component],
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

    fixture = TestBed.createComponent(RateTables3Component);
    component = fixture.componentInstance;
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 3 1st TestCase For Name', () => {
    test('check Header & all products Name', fakeAsync(() => {
      component.table = [
        {
          symbole: RateBaseSymboles.GOLD,
          Header: 'GOLD PRODUCTS',
          sell: 'SELL',
          productname: [{
            "name": "GOLD 999 IMP WITH TDS",
          },
          {
            "name": "GOLD 999 IMP WITH TCS",
          },
          {
            "name": "GOLD 999 LOCAL WITH TDS",
          },
          {
            "name": "GOLD 999 LOCAL WITH TCS",
          }]
        },
      ];
      fixture.detectChanges();
      const headername = componentHtml.querySelector('.header h3')?.textContent?.trim();
      expect(headername).toStrictEqual(component.table[0].Header)
      const Shellname = componentHtml.querySelector('.header p')?.textContent?.trim();
      expect(Shellname).toStrictEqual(component.table[0].sell)
      for (let i = 0; i < 4; i++) {
        const productsname = componentHtml.querySelectorAll('.Items h3')[i].textContent?.trim();
        expect(productsname).toStrictEqual(component.table[0].productname[i].name.trim())
      }
    }))

    describe('Rate Table 3 2nd TestCase For classes', () => {
      let liveRateServiceRef !: LiveRateService
      let rate: BaseSymbolePriceInterface;
      beforeEach(() => {
        liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
        component.table = [
          {
            symbole: RateBaseSymboles.GOLD,
            Header: faker.lorem.word(),
            sell: faker.lorem.word(),
            productname: [{ name: faker.lorem.word() }],
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
        fixture.detectChanges();
      })
      it('Rate Default No class', () => {
        const rateNode = componentHtml.querySelectorAll('.span')[0];
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
      })
      it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask + 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        const rateNode = componentHtml.querySelectorAll('.product_price')[0].querySelector('.span');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
      }))
      it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask - 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        const rateNode = componentHtml.querySelectorAll('.product_price')[0].querySelector('.span');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)
      }))
    })
  });
});
