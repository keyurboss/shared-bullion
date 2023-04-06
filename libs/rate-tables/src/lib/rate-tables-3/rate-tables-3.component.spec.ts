import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables3Component } from './rate-tables-3.component';
import {LiveRateService} from '@rps/buillion-frontend-core/services/live-rate.service';
import {DemoLiveRateService} from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables3Component;
  let fixture: ComponentFixture<RateTables3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables3Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
