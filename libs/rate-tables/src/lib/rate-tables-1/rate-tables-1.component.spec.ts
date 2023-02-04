import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables1Component } from './rate-tables-1.component';

describe('RateTablesComponent', () => {
  let component: RateTables1Component;
  let fixture: ComponentFixture<RateTables1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
