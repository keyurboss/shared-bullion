import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables5Component } from './rate-tables-5.component';

describe('RateTablesComponent', () => {
  let component: RateTables5Component;
  let fixture: ComponentFixture<RateTables5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
