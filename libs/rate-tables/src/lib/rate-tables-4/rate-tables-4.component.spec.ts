import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables4Component } from './rate-tables-4.component';
import { LiveRateService } from '@rps/buillion-frontend-core';
import {DemoLiveRateService} from '@rps/buillion-frontend-core/mock';

describe('RateTablesComponent', () => {
  let component: RateTables4Component;
  let fixture: ComponentFixture<RateTables4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables4Component],
      providers: [
        {
          provide: LiveRateService,
          useClass: DemoLiveRateService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
