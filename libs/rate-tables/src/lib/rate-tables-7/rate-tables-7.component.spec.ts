import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';

import { RateTables7Component } from './rate-tables-7.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { BaseSymbolePriceInterface, RateBaseSymboles } from '@rps/bullion-interfaces';
import { faker } from '@faker-js/faker';
import { RateTables1Component } from '@rps/bullion-rate-tables/table1';
import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';
export const InitialiseRemoteConnection = 'initialiseRemoteConnection';

describe('RateTablesComponent', () => {
  let component: RateTables7Component;
  let fixture: ComponentFixture<RateTables7Component>;

  describe('RateTablesComponent', () => {
    let component: RateTables7Component;
    let fixture: ComponentFixture<RateTables7Component>;
    let componentHtml: ShadowRoot;
  
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
      }).compileComponents();
  
      fixture = TestBed.createComponent(RateTables7Component);
      component = fixture.componentInstance;
      componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    describe('Rate Table 1 1st TestCase For Name', () => {
      test('check Header & all products Name', fakeAsync(() => {
        component.Header = 'Products';
        component.sell = 'SELL';
        component.gold = 'GOLD BAR';
        component.buy = 'BUY';
        component.table = [
          {
            symbole: RateBaseSymboles.GOLD,
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
        fixture.detectChanges();
        const headername = componentHtml
        .querySelector('.parent h3')
        ?.textContent?.trim();
        expect(headername).toStrictEqual(component.Header);
        const Sellname = componentHtml.querySelector('.parent p')?.textContent?.trim();
        expect(Sellname).toStrictEqual(component.sell)
        const lengthR = componentHtml.querySelectorAll('.child_left').length;
        for (let i = 0; i < lengthR; i++) {
          const productsname = componentHtml.querySelectorAll('.child_left')[i].textContent?.trim();
          expect(productsname).toStrictEqual(component.table[0].productname[i].name.trim())
        }
      }));
    });
  
  
  
  
    describe('Rate Table 1 2nd TestCase For classes', () => {
      let liveRateServiceRef!: LiveRateService;
      let rate: BaseSymbolePriceInterface;
      beforeEach(() => {
        liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
        component.table = [
          {
            symbole: RateBaseSymboles.GOLD,
            productname: [{ name: faker.lorem.word() }],
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
              RateBaseSymboles.GOLD,
              {
                ask: rate.ask + 10,
              },
            ],
          ])
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
              RateBaseSymboles.GOLD,
              {
                ask: rate.ask - 10,
              },
            ],
          ])
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
  
})