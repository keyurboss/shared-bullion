import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTables4Component } from './rate-tables-4.component';

describe('RateTablesComponent', () => {
  let component: RateTables4Component;
  let fixture: ComponentFixture<RateTables4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTables4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(RateTables4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
