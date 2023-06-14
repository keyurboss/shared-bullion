import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { RateTables10Component } from './rate-tables-10.component';
import { LiveRateService } from '@rps/buillion-frontend-core/services/live-rate.service';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
export const InitialiseRemoteConnection = 'initialiseRemoteConnection';

describe('RateTablesComponent', () => {
  let component: RateTables10Component;
  let fixture: ComponentFixture<RateTables10Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables10Component],
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

    fixture = TestBed.createComponent(RateTables10Component);
    component = fixture.componentInstance;
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rate Table 10 1st TestCase For values', () => {
    test('check all products Name', fakeAsync(() => {
      component.data = [
        {
          name: 'GOLD',
          imageLink: 'https://akshatgold.com/assets/img/gold_bar_back.png',
          rate: '1997.50',
        },
        {
          name: 'SILVER',
          imageLink: 'https://akshatgold.com/assets/img/silver_bar_back.png',
          rate: '25.40',
        },
        {
          name: 'INR',
          imageLink: 'https://akshatgold.com/assets/img/rabi_logo.png',
          rate: '82.1600',
        },
      ];
      fixture.detectChanges();
      for (let i = 0; i < 3; i++) {
        const productsname = componentHtml
          .querySelectorAll('.name')
          [i].textContent?.trim();
        expect(productsname).toStrictEqual(component.data[i].name);
        const productsrate = componentHtml
          .querySelectorAll('.rate')
          [i].textContent?.trim();
        expect(productsrate).toStrictEqual(component.data[i].rate);
        // const shadow = fixture.debugElement.nativeElement.shadowRoot;
        const productsimg = componentHtml.querySelectorAll('img');
        expect(productsimg[i].src).toStrictEqual(component.data[i].imageLink);
      }
    }));

    //   describe('Rate Table 3 2nd TestCase For classes', () => {
    //     let liveRateServiceRef !: LiveRateService
    //     let rate: BaseSymbolePriceInterface;
    //     beforeEach(() => {
    //       liveRateServiceRef = fixture.debugElement.injector.get(LiveRateService);
    //       component.table = [
    //         {
    //           symbole: RateBaseSymboles.GOLD,
    //           Header: faker.lorem.word(),
    //           sell: faker.lorem.word(),
    //           productname: [{ name: faker.lorem.word() }],
    //         }
    //       ]

    //       rate = RatesFixture.Generate({
    //         top: 1500,
    //         bottom: 1000,
    //         // points: 0
    //       }, {
    //         bottom: 1,
    //         top: 15,
    //         // points: 0
    //       })
    //       liveRateServiceRef.setRate(new Map([
    //         [RateBaseSymboles.GOLD, rate]
    //       ]))
    //       liveRateServiceRef.setRate(new Map([
    //         [RateBaseSymboles.GOLD, rate]
    //       ]))
    //       fixture.detectChanges();
    //     })
    //     it('Rate Default No class', () => {
    //       const rateNode = componentHtml.querySelectorAll('.span')[0];
    //       expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
    //       expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
    //     })
    //     it('Rate Low color Red class contains rate_low not rate_high', fakeAsync(() => {
    //       liveRateServiceRef.setRate(new Map([
    //         [RateBaseSymboles.GOLD, {
    //           ask: rate.ask + 10,
    //         }]
    //       ]))
    //       fixture.detectChanges()
    //       flush()
    //       const rateNode = componentHtml.querySelectorAll('.product_price')[0].querySelector('.span');
    //       expect(rateNode?.classList.contains('rate_high')).toStrictEqual(true)
    //       expect(rateNode?.classList.contains('rate_low')).toStrictEqual(false)
    //     }))
    //     it('Rate High color Green class contains rate_high not rate_low', fakeAsync(() => {
    //       liveRateServiceRef.setRate(new Map([
    //         [RateBaseSymboles.GOLD, {
    //           ask: rate.ask - 10,
    //         }]
    //       ]))
    //       fixture.detectChanges()
    //       flush()
    //       const rateNode = componentHtml.querySelectorAll('.product_price')[0].querySelector('.span');
    //       expect(rateNode?.classList.contains('rate_high')).toStrictEqual(false)
    //       expect(rateNode?.classList.contains('rate_low')).toStrictEqual(true)
    //     }))
    //   })
    // });
  });
});
