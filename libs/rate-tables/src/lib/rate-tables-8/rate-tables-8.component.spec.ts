import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables8Component } from './rate-tables-8.component';
import { 
  LiveRateService,
} from '@rps/buillion-frontend-core/services/live-rate.service';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables8Component;
  let fixture: ComponentFixture<RateTables8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables8Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
