import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import {
  LiveRateService,
} from '@rps/buillion-frontend-core/services/live-rate.service';
import { RateBaseSymboles } from '@rps/bullion-interfaces';

import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { RateTables2Component } from './rate-tables-2.component';

describe('RateTablesComponent', () => {
  let component: RateTables2Component;
  let componentHtml: ShadowRoot;
  let fixture: ComponentFixture<RateTables2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables2Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(RateTables2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
  });



  describe('Rate Table 8 1st TestCase', () => {
    test('check table length & products Name', fakeAsync(() => {
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
      const headerName = componentHtml.querySelector('.header .gold');
      console.log(headerName?.textContent?.trim());
      expect(headerName).toStrictEqual(component.table[0].productName);
    }))
  })
  
  // describe('Rate Table 8 2nd TestCase', () => {
  //   let liveRateServiceRef !: LiveRateService
  //   let rate: BaseSymbolePriceInterface;
  //   beforeEach(() => {
    //     liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
    //     component.table = [
      //       {
        //         headerName: faker.lorem.word(),
        //         symbole: RateBaseSymboles.GOLD,
        //         details: [{ Name: faker.lorem.word() }],
  //       }
  //     ]
  //     rate = RatesFixture.Generate({
  //       top: 1500,
  //       bottom: 1000,
  //       // points: 0
  //     }, {
    //       bottom: 1,
    //       top: 15,
  //       // points: 0
  //     })
  //     liveRateServiceRef.setRate(new Map([
    //       [RateBaseSymboles.GOLD, rate]
  //     ]))
  //     liveRateServiceRef.setRate(new Map([
    //       [RateBaseSymboles.GOLD, rate]
    //     ]))
    //     fixture.detectChanges();
    //   })
    //   it('check table & class according rates', fakeAsync(() => {
      //     fixture.detectChanges();
      //     tick()
      //     const tableElements = componentHtml.querySelectorAll('.table');
      //     expect(tableElements.length).toStrictEqual(component.table.length);
  //     const tabelEle = tableElements[0];
  //     const detailsElements = tabelEle.querySelectorAll('.details');
  //     expect(detailsElements).toHaveLength(component.table[0].details.length);
  //     const detaileEle = detailsElements[0];
  //     const ratenode = detaileEle.childNodes[1]
  //     expect(ratenode.textContent?.trim()).toStrictEqual(rate.ask.toString());
  //   }));
  //   it('Rate Default No class', () => {
    //     const tableElements = componentHtml.querySelectorAll('.table');
    //     const rateNode = tableElements[0].querySelectorAll('.body .details')[0].querySelector('h3');
    //     expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
    //     expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
    //   })
    //   it('Rate Low color Red class rate_low not rate_high', fakeAsync(() => {
      //     liveRateServiceRef.setRate(new Map([
  //       [RateBaseSymboles.GOLD, {
    //         ask: rate.ask + 10
  //       }]
  //     ]))
  //     fixture.detectChanges()
  //     flush()
  //     const tableElements = componentHtml.querySelectorAll('.table');
  //     const rateNode = tableElements[0].querySelectorAll('.body .details')[0].querySelector('h3');
  //     expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
  //     expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
  //   }))
  //   it('Rate High color Green class rate_high not rate_low', fakeAsync(() => {
  //     liveRateServiceRef.setRate(new Map([
    //       [RateBaseSymboles.GOLD, {
      //         ask: rate.ask - 10
      //       }]
      //     ]))
      //     fixture.detectChanges()
      //     flush()
      //     const tableElements = componentHtml.querySelectorAll('.table');
      //     const rateNode = tableElements[0].querySelectorAll('.body .details')[0].querySelector('h3');
  //     expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)
  //     expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
  //   }))
  // })
});