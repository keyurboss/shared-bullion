import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables6Component } from './rate-tables-6.component';

describe('RateTablesComponent', () => {
  let component: RateTables6Component;
  let fixture: ComponentFixture<RateTables6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
