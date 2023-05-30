import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables1Component } from './rate-tables-1.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;
  let comp: ShadowRoot;

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
    comp = (fixture.nativeElement as HTMLElement).shadowRoot!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`name of data should be corrected`, () => {
    const dataL = comp.querySelectorAll('.child').length;
    for (let i = 0; i < dataL; i++) {
      const data = comp
        .querySelectorAll('.child')
        [i].querySelector('.child_left')
        ?.textContent?.trim();
      expect(data).toBe(component.data[i].name);
    }
  });

});
