import { ComponentFixture, TestBed } from '@angular/core/testing';
  
import { RateTables2Component } from './rate-tables-2.component';
import { 
  LiveRateService,
} from '@rps/buillion-frontend-core/services/live-rate.service';
import { DemoLiveRateService } from '@rps/buillion-frontend-core/mock';


describe('RateTablesComponent', () => {
  let component: RateTables2Component;
  let fixture: ComponentFixture<RateTables2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables2Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
