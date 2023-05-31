import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { RateTables6Component } from './rate-tables-6.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService, InitialiseRemoteConnection } from '@rps/buillion-frontend-core/mock';
import { RateBaseSymboles } from '@rps/bullion-interfaces';

describe('RateTablesComponent', () => {
  let component: RateTables6Component;
  let fixture: ComponentFixture<RateTables6Component>;
  let componentHtml: ShadowRoot;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables6Component],
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

    fixture = TestBed.createComponent(RateTables6Component);
    component = fixture.componentInstance;
    componentHtml = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Rate Table 3 1st TestCase For Name', () => {
    test('check Header all Text && products length and Name', fakeAsync(() => {
      component.headers = {
        HeaderName: 'FUTURE RATE',
        bid: 'BID',
        diff: 'DIFF',
        ask: 'ASK',
      }
      component.table = [
        {
          ProductName: 'GOLD FUTURE',
          symbole: RateBaseSymboles.GOLD_MCX,
        },
        {
          ProductName: 'SILVER FUTURE',
          symbole: RateBaseSymboles.SILVER_MCX,
        },
      ];
      fixture.detectChanges();
      const footerlength = componentHtml.querySelectorAll('.footer_item')?.length;
      expect(footerlength).toStrictEqual(component.table.length)
    }))
  })
});
