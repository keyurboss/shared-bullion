import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables5Component } from './rate-tables-5.component';
import {LiveRateService} from '@rps/buillion-frontend-core/services/live-rate.service';
import {DemoLiveRateService} from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables5Component;
  let fixture: ComponentFixture<RateTables5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables5Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
