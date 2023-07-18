import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables11Component } from './rate-tables-11.component';
import { LiveRateService } from '@rps/buillion-frontend-core/services';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables11Component;
  let fixture: ComponentFixture<RateTables11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables11Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
