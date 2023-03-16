import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables6Component } from './rate-tables-6.component';
import {LiveRateService} from '@rps/buillion-frontend-core/services/live-rate.service';
import {DemoLiveRateService} from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables6Component;
  let fixture: ComponentFixture<RateTables6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables6Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
