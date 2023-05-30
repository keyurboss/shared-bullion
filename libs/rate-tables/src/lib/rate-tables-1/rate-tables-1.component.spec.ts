import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LiveRateService } from '@rps/buillion-frontend-core';
import {
  DemoLiveRateService,
  InitialiseRemoteConnection,
} from '@rps/buillion-frontend-core/mock';
import { RateBaseSymboles } from '@rps/bullion-interfaces';
import { RateTables1Component } from './rate-tables-1.component';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;
  let componentHtml: ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables1Component],
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

    fixture = TestBed.createComponent(RateTables1Component);
    component = fixture.componentInstance;
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 1 1st TestCase For Name', () => {
    test('check Header & all products Name', fakeAsync(() => {
      component.header = 'GOLD';
      component.sell = 'SELL';
      component.table = [
        {
          symbole: RateBaseSymboles.GOLD,
          productname: [
            {
              name: 'GOLD 999 IMP WITH TDS',
            },
            {
              name: 'GOLD 999 IMP WITH TCS',
            },
            {
              name: 'GOLD 999 LOCAL WITH TDS',
            },
            {
              name: 'GOLD 999 LOCAL WITH TCS',
            },
          ],
        },
      ];
      fixture.detectChanges();
      const headername = componentHtml
        .querySelector('.parent h3')
        ?.textContent?.trim();
      expect(headername).toStrictEqual(component.header);
      console.log(headername);
      console.log(component.header);
      const childname = componentHtml
        .querySelector('.child')
        ?.querySelector('.child_left')?.innerHTML;
      console.log(childname);
    }));
  });
});
