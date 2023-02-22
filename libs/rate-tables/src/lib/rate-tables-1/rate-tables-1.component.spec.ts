import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables1Component } from './rate-tables-1.component';
import { LiveRateService } from '../../../../frontend-core/src';
import { DemoLiveRateService } from '../../../../frontend-core/src/mock';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
