import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables3Component } from './rate-tables-3.component';

describe('RateTablesComponent', () => {
  let component: RateTables3Component;
  let fixture: ComponentFixture<RateTables3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
