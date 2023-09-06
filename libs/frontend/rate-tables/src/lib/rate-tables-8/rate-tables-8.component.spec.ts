import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { faker } from '@faker-js/faker';
import { RatesFixture } from '@bf/services/fixtures';
import { LiveRateService } from '@bf/services';
import {
  BaseSymbolPriceInterface,
  RateBaseSymbols,
} from '@rps/bullion-interfaces';
import { RateTables8Component } from './rate-tables-8.component';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@bf/services/mock';
import { ChangeDetectionStrategy } from '@angular/core';

describe('RateTablesComponent', () => {
  let component: RateTables8Component;
  let componentHtml: ShadowRoot;
  let fixture: ComponentFixture<RateTables8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables8Component],
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
      .overrideComponent(RateTables8Component, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(RateTables8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
  });
  describe('Rate Table 8 1st TestCase', () => {
    test('check table length & products Name', fakeAsync(() => {
      component.table = [
        {
          headerName: 'GOLD PRODUCT',
          symbol: RateBaseSymbols.GOLD,
          details: [
            {
              Name: 'IMP 999 RTGS (TCS)',
            },
            {
              Name: 'LOCAL RTGS (TCS)',
            },
          ],
        },
        {
          headerName: 'SILVER PRODUCT',
          symbol: RateBaseSymbols.SILVER,
          details: [
            {
              Name: 'PETI 30KG RTGS (TCS)',
            },
            {
              Name: 'CHORSA RTGS (TCS)',
            },
          ],
        },
      ];
      fixture.detectChanges();
      const tableElements = componentHtml.querySelectorAll('.table');
      expect(tableElements.length).toStrictEqual(component.table.length);
      tableElements.forEach((ele, i) => {
        const headerElement = ele.querySelector('.name')?.textContent;
        expect(headerElement).toStrictEqual(component.table[i]?.headerName);
        const detailsElements = ele.querySelectorAll('.details');
        expect(detailsElements).toHaveLength(
          component.table[i]?.details.length ?? 0,
        );
        detailsElements.forEach((detailsEle, detailsIndex) => {
          const nameElement = detailsEle.querySelector('h2')?.textContent;
          expect(nameElement?.trim()).toBe(
            component.table[i]?.details[detailsIndex]?.Name,
          );
        });
      });
    }));
  });
  describe('Rate Table 8 2nd TestCase', () => {
    let liveRateServiceRef!: LiveRateService;
    let rate: BaseSymbolPriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.table = [
        {
          headerName: faker.lorem.word(),
          symbol: RateBaseSymbols.GOLD,
          details: [{ Name: faker.lorem.word() }],
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
    it('check table & class according rates', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      const tableElements = componentHtml.querySelectorAll('.table');
      expect(tableElements.length).toStrictEqual(component.table.length);
      const tabelEle = tableElements[0];
      const detailsElements = tabelEle?.querySelectorAll('.details');
      expect(detailsElements).toHaveLength(
        component.table[0]?.details.length ?? 0,
      );
      const detaileEle = detailsElements ? detailsElements[0] : undefined;
      const ratenode = detaileEle?.childNodes[1];
      expect(ratenode?.textContent?.trim()).toStrictEqual(rate.ask.toString());
    }));
    it('Rate Default No class', () => {
      const tableElements = componentHtml.querySelectorAll('.table');
      const rateNode = tableElements[0]
        ?.querySelectorAll('.body .details')[0]
        ?.querySelector('h3');
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
    });
    it('Rate Low color Red class rate_low not rate_high', fakeAsync(() => {
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
      const tableElements = componentHtml.querySelectorAll('.table');
      const rateNode = tableElements[0]
        ?.querySelectorAll('.body .details')[0]
        ?.querySelector('h3');
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true);
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false);
    }));
    it('Rate High color Green class rate_high not rate_low', fakeAsync(() => {
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
      const tableElements = componentHtml.querySelectorAll('.table');
      const rateNode = tableElements[0]
        ?.querySelectorAll('.body .details')[0]
        ?.querySelector('h3');
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true);
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false);
    }));
  });
});
