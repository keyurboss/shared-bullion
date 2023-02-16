import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables7Component } from './rate-tables-7.component';

describe('RateTablesComponent', () => {
  let component: RateTables7Component;
  let fixture: ComponentFixture<RateTables7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables7Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
