import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables1Component } from './rate-tables-1.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;
let comp:ShadowRoot;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables1Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables1Component);
    component = fixture.componentInstance;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    comp=(fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the product name', () => {
    const productName = 'GOLD 999 IMP WITH TDS';
    // component.data = [{ name: productName }];
    fixture.detectChanges();
    const productNameElement = comp.querySelector('.child_left')?.textContent;
    expect(productNameElement?.trim()).toContain(productName.trim());
  });
});
