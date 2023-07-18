import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';
import { RateTables10Component } from './rate-tables-10.component';
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
          [i]?.textContent?.trim();
        expect(productsname).toStrictEqual(component.data[i]?.name);
        const productsrate = componentHtml
          .querySelectorAll('.rate')
          [i]?.textContent?.trim();
        expect(productsrate).toStrictEqual(component.data[i]?.rate);
        // const shadow = fixture.debugElement.nativeElement.shadowRoot;
        const productsimg = componentHtml.querySelectorAll('img');
        expect(productsimg[i]?.src).toStrictEqual(component.data[i]?.imageLink);
      }
    }));
  });
});
