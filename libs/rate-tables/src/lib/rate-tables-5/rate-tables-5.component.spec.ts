import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { RateTables5Component } from './rate-tables-5.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService, InitialiseRemoteConnection } from '@rps/buillion-frontend-core/mock';
import { BaseSymbolePriceInterface, RateBaseSymboles } from '@rps/bullion-interfaces';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';

describe('RateTablesComponent', () => {
  let component: RateTables5Component;
  let fixture: ComponentFixture<RateTables5Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables5Component],
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

    fixture = TestBed.createComponent(RateTables5Component);
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
          productName: 'GOLD SPOT'
        },
      ];
      fixture.detectChanges();
      for (let i = 0; i < 2; i++) {
        const productname = componentHtml.querySelectorAll('.productname')[i].textContent?.trim();
        expect(productname).toStrictEqual(component.table[0].productName)
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
            productName: faker.lorem.word(),
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
        // CHECK FOR SMALL TABLE
        const rateNode = componentHtml.querySelector('.box_footer_uperitem')?.querySelector('span');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)

        // CHECK FOR BIG TABLE
        for (let i = 0; i < 2; i++) {
          const rateNode = componentHtml.querySelectorAll('.bidAskrate')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
        }
      })
      it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask + 10,
            bid: rate.bid + 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        // CHECK FOR SMALL TABLE
        const rateNode = componentHtml.querySelector('.box_footer_uperitem')?.querySelector('span');
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)

        // CHECK FOR BIG TABLE
        for (let i = 0; i < 2; i++) {
          const rateNode = componentHtml.querySelectorAll('.bidAskrate')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
        }
      }))
      it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
        liveRateServiceRef.setRate(new Map([
          [RateBaseSymboles.GOLD, {
            ask: rate.ask - 10,
            bid: rate.bid - 10,
          }]
        ]))
        fixture.detectChanges()
        flush()
        // CHECK FOR SMALL TABLE
        const rateNode = componentHtml.querySelector('.box_footer_uperitem')?.querySelector('span');;
        expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
        expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)

        // CHECK FOR BIG TABLE
        for (let i = 0; i < 2; i++) {
          const rateNode = componentHtml.querySelectorAll('.bidAskrate')[i];
          expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
          expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)
        }
      }))
    })
  });
});

