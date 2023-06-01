/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { RateTables7Component } from './rate-tables-7.component';
// import { faker } from '@faker-js/faker';
// import { RatesFixture } from '@rps/buillion-frontend-core/fixtures';
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
    }).compileComponents();

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
        symbole: RateBaseSymboles.SILVER,
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
  describe('Rate Table 1 1st TestCase For Name', () => {
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
        const PrObject = component.table[i].productname;
        for (let j = 0; j < PrObject.length; j++) {
          const productsname = comp.querySelectorAll('.productname');
          expect(productsname[j].textContent?.trim()).toStrictEqual(
            PrObject[j].name
          );
        }
      }
    });
  });

});
