import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables7Component } from './rate-tables-7.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables7Component;
  let fixture: ComponentFixture<RateTables7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables7Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
