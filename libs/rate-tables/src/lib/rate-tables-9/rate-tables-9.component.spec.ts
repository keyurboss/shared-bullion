import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables9Component } from './rate-tables-9.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables9Component;
  let fixture: ComponentFixture<RateTables9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables9Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
