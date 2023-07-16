import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables10Component } from './rate-tables-10.component';
import { LiveRateService } from '@rps/buillion-frontend-core/services/live-rate.service';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables10Component;
  let fixture: ComponentFixture<RateTables10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables10Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
