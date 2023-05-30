import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';

import { RateTables4Component } from './rate-tables-4.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { BaseSymbolePriceInterface, RateBaseSymboles } from '@rps/bullion-interfaces';
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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables4Component);
    component = fixture.componentInstance;
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
          symbole: RateBaseSymboles.GOLD,
          product_name: 'GOLD PRODUCTS'
        },
        {
          symbole: RateBaseSymboles.SILVER,
          product_name: 'SILVER PRODUCTS'
        }
      ];
      fixture.detectChanges();
      const productlength = componentHtml.querySelectorAll('.product').length;
      expect(productlength).toStrictEqual(component.table.length);
      for (let i = 0; i < productlength; i++) {
        const productname = componentHtml.querySelectorAll('.product_name')[i]?.textContent?.trim();
        expect(productname).toStrictEqual(component.table[i].product_name)
      }
    }))
  })
  describe('Rate Table 3 2nd TestCase For classes', () => {
    let liveRateServiceRef !: LiveRateService
    let rate: BaseSymbolePriceInterface;
    beforeEach(() => {
      liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
      component.table = [
        {
          symbole: RateBaseSymboles.GOLD,
          product_name: faker.lorem.word(),
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
      const rateNode = componentHtml.querySelectorAll('.span')[0];
      expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
      expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
    })
  });
});
